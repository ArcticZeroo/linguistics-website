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
import { MorphemeType } from './morpheme';

export interface IResolvedDependency {
    value: string;
    type: MorphemeType;
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

        const complementResolutions = this.resolveDependencyStrings(wordData.translationData, otherDependencyTypes);

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

    private resolveSingleDependencyUsingAlone(dependencyType: TranslationDataType, words: IWordInputData[]) {
        for (const wordData of words) {
            const availableDependencies = getAvailableDependencies(wordData.translationData);

            if (availableDependencies.length === 1 && availableDependencies[0] === dependencyType) {
                return wordData.word;
            }
        }

    }

    private resolveSingleDependency(dependencyType: TranslationDataType, dependencyValue: string) {
        console.log('resolving single dependency', `"${dependencyValue}"`, 'of type', dependencyType);

        const wordsWithSameDependency: Optional<Array<IWordInputData>> = this._groupedInputs[dependencyType][dependencyValue];

        if (!wordsWithSameDependency || !wordsWithSameDependency.length) {
            throw new UnresolvableDependencyException(`No words exist with the desired dependency "${dependencyValue}" and type "${dependencyType}"`);
        }

        let resolvedWithAlone = this.resolveSingleDependencyUsingAlone(dependencyType, wordsWithSameDependency);

        if (resolvedWithAlone) {
            return resolvedWithAlone;
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

    private resolveDependencyStrings(source: ITranslationData, dependencyFilter?: Optional<Array<TranslationDataType>>) {
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

    private canResolveAllDependencies(source: ITranslationData) {
        try {
            this.resolveDependencyStrings(source);
        } catch (e) {
            return false;
        }

        return true;
    }

    private isDependencyInfix(baseWord: string, rootValue: string, dependencyValue: string) {
        const rootIsInWord = baseWord.includes(rootValue);

        return !rootIsInWord && rootValue.replace(dependencyValue, '').includes(rootValue);
    }

    private isDependencyCircumfix(prefixes: string, suffixes: string, dependencyValue: string) {
        if (dependencyValue.length < 2) {
            return false;
        }

        const pre = dependencyValue.split('');
        const post = [];

        do {
            post.unshift(pre.pop());

            if (prefixes.includes(pre.join('')) && suffixes.includes(post.join(''))) {
                return true;
            }
        } while(post.length < dependencyValue.length - 1);

        return false;
    }

    private resolveSingleDependencyMorphemeTypeForSingleWord(wordData: IWordInputData, resolvedDependencyValue: string) {
        console.log('trying to resolve from word', wordData.word, wordData);

        if (!this.canResolveAllDependencies(wordData.translationData)) {
            console.log('not all dependencies could be resolved :(');
            return MorphemeType.unknown;
        }

        const rootDependencyValue = wordData.translationData.values[TranslationDataType.root];
        const resolvedRootValue = this.getCachedResolution(TranslationDataType.root, rootDependencyValue);

        if (!resolvedRootValue) {
            console.log('root dependency is missing for unknown reason');
            return MorphemeType.unknown;
        }

        if (this.isDependencyInfix(wordData.word, resolvedRootValue, resolvedDependencyValue)) {
            return MorphemeType.infix;
        }

        const [prefixes, suffixes] = wordData.word.split(resolvedRootValue);

        if (prefixes && prefixes.includes(resolvedDependencyValue)) {
            return MorphemeType.prefix;
        }

        if (suffixes && suffixes.includes(resolvedDependencyValue)) {
            return MorphemeType.suffix;
        }

        if (prefixes && suffixes && this.isDependencyCircumfix(prefixes, suffixes, resolvedDependencyValue)) {
            return MorphemeType.circumfix;
        }

        return MorphemeType.unknown;
    }

    private resolveSingleDependencyMorphemeType(source: ITranslationData, dependencyType: TranslationDataType) {
        const dependencyValue = source.values[dependencyType];
        const resolvedDependencyValue = this.getCachedResolution(dependencyType, dependencyValue);

        console.log('resolving morpheme for type', dependencyType, 'and value', dependencyValue, 'with resolved value', resolvedDependencyValue);

        if (!resolvedDependencyValue) {
            console.log('type is not already resolved');
            return MorphemeType.unknown;
        }

        if (dependencyType === TranslationDataType.root) {
            console.log('trying to resolve morpheme type of root');
            return MorphemeType.root;
        }

        const wordsWithSameDependency: Optional<Array<IWordInputData>> = this._groupedInputs[dependencyType][dependencyValue];

        if (!wordsWithSameDependency || !wordsWithSameDependency.length) {
            console.log('no comparison dependencies for type', dependencyType, 'and value', dependencyValue);
            return MorphemeType.unknown;
        }

        const wordVotes: Map<MorphemeType, number> = new Map();
        const highestVotedType = {
            type: MorphemeType.unknown,
            value: 0
        };

        for (const wordData of wordsWithSameDependency) {
            const morphemeTypeInThisWord = this.resolveSingleDependencyMorphemeTypeForSingleWord(wordData, resolvedDependencyValue);

            if (morphemeTypeInThisWord === MorphemeType.unknown) {
                continue;
            }

            const newCount = (wordVotes.get(morphemeTypeInThisWord) || 0) + 1;
            wordVotes.set(morphemeTypeInThisWord, newCount);

            if (newCount > highestVotedType.value) {
                highestVotedType.type = morphemeTypeInThisWord;
                highestVotedType.value = newCount;
            }
        }

        return highestVotedType.type;

    }

    resolveDependencies(source: ITranslationData) {
        const resolvedStrings = this.resolveDependencyStrings(source);

        console.log('dependency cache after resolving strings:', this._resolvedDependenciesByTypeByName);

        const resolvedDependencies = {};

        for (const dependencyType of generateAvailableDependencies(source)) {
            resolvedDependencies[dependencyType] = {
                value: resolvedStrings[dependencyType],
                type: this.resolveSingleDependencyMorphemeType(source, dependencyType)
            }
        }

        return resolvedDependencies;
    }
}