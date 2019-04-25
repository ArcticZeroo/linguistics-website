import { IWordInputData } from '../../../components/routes/morphology/input/InputsTable';
import { ITranslationData, TranslationDataType } from '../../../components/routes/morphology/TranslationSettings';
import Optional from '../../../models/Optional';
import { longestCommonSubstring } from '../../../util/StringUtil';
import UnresolvableDependencyException from '../../exception/UnresolvableDependencyException';
import {
    findCommonDependenciesFromList,
    generateAvailableDependencies,
    getAvailableDependencies,
    GroupedInputData
} from './dependency';

interface IDependencyResolverParams {
    groupedInputs: GroupedInputData;
}

export default class DependencyResolver {
    private readonly _groupedInputs: GroupedInputData;
    private readonly _resolvedDependenciesByTypeByName: Map<TranslationDataType, Map<string, string>>;
    private readonly _resolutionsInProgress: Map<TranslationDataType, Map<string, boolean>>;

    constructor(groupedInputs: GroupedInputData) {
        this._groupedInputs = groupedInputs;
        this._resolvedDependenciesByTypeByName = new Map();
        this._resolutionsInProgress = new Map();
    }

    private listLongestCommonSubstring(words: IWordInputData[]) {
        if (!words || !words.length) {
            return '';
        }

        let listLcs = words[0].word;

        for (let i = 1; i < words.length; ++i) {
            listLcs = longestCommonSubstring(listLcs, words[i].word);
        }

        return listLcs;
    }

    private getCachedResolution(dependencyType: TranslationDataType, dependencyValue: string): Optional<string> {
        const resolvedForType = this._resolvedDependenciesByTypeByName.get(dependencyType);

        if (resolvedForType && resolvedForType.has(dependencyValue)) {
            const value = resolvedForType.get(dependencyValue);

            if (value) {
                console.log('its value is cached as', value);
                return value;
            }
        }
    }

    private resolveSingleDependencyUsingCommon(dependencyType: TranslationDataType, wordsWithSameDependency: IWordInputData[]): Optional<string> {
        const commonDependencies = findCommonDependenciesFromList(wordsWithSameDependency);

        const commonDependencyTypes = getAvailableDependencies(commonDependencies);

        console.log('for dependency type', dependencyType, 'the words with same dependency are:', wordsWithSameDependency);
        console.log('common dependency types:', commonDependencyTypes);

        if (commonDependencyTypes.length !== 1) {
            throw new UnresolvableDependencyException('Common dependency count must be 1 for this method of inference');
        }

        const [commonDependencyType] = commonDependencyTypes;

        if (commonDependencyType !== dependencyType) {
            throw new UnresolvableDependencyException('Common dependency type must be the desired dependency type');
        }

        return this.listLongestCommonSubstring(wordsWithSameDependency);
    }

    private resolveSingleDependencyWithComplement(dependencyType: TranslationDataType, wordData: IWordInputData) {
        const otherDependencyTypes = getAvailableDependencies(wordData.translationData).filter(dependency => dependency !== dependencyType);

        if (!otherDependencyTypes.length) {
            throw new UnresolvableDependencyException('Only a single dependency exists on this word. This should never happen');
        }

        const complementResolutions = this.resolveDependency(wordData.translationData, otherDependencyTypes);

        console.log('successfully resolved all complement dependencies');
        console.log(complementResolutions);
        console.log(this._resolvedDependenciesByTypeByName);

        let wordString = wordData.word;
        for (const dependencyType of otherDependencyTypes) {
            wordString = wordString.replace(complementResolutions[dependencyType], '');
        }

        // Whatever is left is the dependency, I guess
        return wordString;
    }

    private resolveSingleDependency(dependencyType: TranslationDataType, dependencyValue: string) {
        console.log('resolving single dependency', `"${dependencyValue}"`, 'of type', dependencyType);

        const wordsWithSameDependency: Optional<Array<IWordInputData>> = this._groupedInputs[dependencyType][dependencyValue];

        if (!wordsWithSameDependency || !wordsWithSameDependency.length) {
            throw new UnresolvableDependencyException(`No words exist with the desired dependency "${dependencyValue}" and type "${dependencyType}"`);
        }

        if (wordsWithSameDependency.length >= 2) {
            console.log('attempting common method');
            try {
                const resolvedWithCommon = this.resolveSingleDependencyUsingCommon(dependencyType, wordsWithSameDependency);

                if (resolvedWithCommon) {
                    return resolvedWithCommon;
                }
            } catch (e) {

            }
            console.log('common method was unsuccessful');
        } else {
            console.log('There are not enough words to attempt common method -- ', wordsWithSameDependency);
        }

        for (const wordData of wordsWithSameDependency) {
            console.log('attempting complement method for', wordData.word);

            try {
                const resolvedWithComplement = this.resolveSingleDependencyWithComplement(dependencyType, wordData);

                if (resolvedWithComplement) {
                    return resolvedWithComplement;
                }
            } catch (e) {
            }
        }

        // root can have infixes. Nothing else can......
        if (wordsWithSameDependency.length >= 2 && dependencyType !== TranslationDataType.root) {
            console.log('only remaining method is a LCS across the same dependency words');
            return this.listLongestCommonSubstring(wordsWithSameDependency);
        }

        throw new UnresolvableDependencyException('Unable to resolve dependency with all available methods of inference');
    }

    resolveDependency(source: ITranslationData, dependencyFilter?: Array<TranslationDataType>) {
        console.log('resolving from source', source, 'with filter', dependencyFilter);

        const resolvedDependencies = {};

        for (const dependencyType of generateAvailableDependencies(source)) {
            if (dependencyFilter && !dependencyFilter.includes(dependencyType)) {
                continue;
            }

            const dependencyValue = source.values[dependencyType];

            const cachedResolution = this.getCachedResolution(dependencyType, dependencyValue);

            if (cachedResolution) {
                resolvedDependencies[dependencyType] = cachedResolution;
                continue;
            }

            let resolutionsForType = this._resolutionsInProgress.get(dependencyType);

            if (resolutionsForType) {
                if (resolutionsForType.get(dependencyValue) === true) {
                    throw new UnresolvableDependencyException(`source dependency ${dependencyValue} already has a resolution in progress`);
                }
            } else {
                this._resolutionsInProgress.set(dependencyType, (resolutionsForType =  new Map()));
            }

            resolutionsForType.set(dependencyValue, true);

            if (!this._resolvedDependenciesByTypeByName.has(dependencyType)) {
                this._resolvedDependenciesByTypeByName.set(dependencyType, new Map());
            }

            let resolved;
            try {
                resolved = this.resolveSingleDependency(dependencyType, dependencyValue);
            } finally {
                resolutionsForType.set(dependencyType, false);
            }

            console.log('resolved', dependencyValue, 'as', resolved);

            this._resolvedDependenciesByTypeByName
                // we know that this get can't be null, hence the non-nullable operator
                .get(dependencyType)!
                .set(dependencyValue, resolved);

            resolvedDependencies[dependencyType] = resolved;
        }

        return resolvedDependencies;
    }
}