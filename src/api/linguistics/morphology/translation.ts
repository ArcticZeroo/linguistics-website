import { Group } from 'react-native';
import { IInputState, IWordInputData } from '../../../components/routes/morphology/input/InputsTable';
import { ITranslationData, TranslationDataType } from '../../../components/routes/morphology/TranslationSettings';
import { longestCommonSubstring } from '../../../util/StringUtil';
import UnresolvableDependencyException from '../../exception/UnresolvableDependencyException';

type GroupedInputData = { [type: number]: { [value: string]: IWordInputData[] } };

interface IDependencyData {
    [TranslationDataType.base]?: string;
    [TranslationDataType.adjective]?: string;
    [TranslationDataType.pronoun]?: string;
    [TranslationDataType.plural]?: boolean;
}

enum MorphemeType {
    prefix, suffix, infix, circumfix
}

interface IResolvedDependency {
    dependencyType: TranslationDataType;
    morphemeType: MorphemeType;
}

const possibleDependencies = [TranslationDataType.base, TranslationDataType.adjective, TranslationDataType.pronoun, TranslationDataType.plural];

function* generateAvailableDependencies(source: ITranslationData): IterableIterator<TranslationDataType> {
    for (const possibleDependency of possibleDependencies) {
        if (source.isEnabled[possibleDependency]) {
            yield possibleDependency;
        }
    }
}

function getAvailableDependencies(source: ITranslationData): TranslationDataType[] {
    return Array.from(generateAvailableDependencies(source));
}

function groupValues(wordDataList: IWordInputData[]): {} {
    const grouped: GroupedInputData = {};

    for (const dataType of [TranslationDataType.base, TranslationDataType.adjective, TranslationDataType.plural, TranslationDataType.pronoun]) {
        grouped[dataType] = {};
    }

    for (const wordData of wordDataList) {

        for (const dataType of Object.keys(wordData.translationData.isEnabled)) {
            if (!wordData.translationData.isEnabled[dataType]) {
                continue;
            }

            const value = wordData.translationData.values[dataType];

            const groupedTypeData = grouped[dataType];

            if (!groupedTypeData.hasOwnProperty(value)) {
                groupedTypeData[value] = [];
            }

            groupedTypeData[value].push(wordData);
        }
    }

    return grouped;
}

type ResolutionsInProgress = { [word: string]: { [type: number]: boolean } };

interface IResolveDependencyParams {
    groupedData: GroupedInputData;
    inputData: IWordInputData;
    dependencyTypes: TranslationDataType[];
    resolutionsInProgress: ResolutionsInProgress;
}

interface IResolveSingleDependencyParams {
    groupedData: GroupedInputData;
    dependencyType: TranslationDataType;
    dependencySource: IWordInputData;
}

interface IResolveDependencyBaseParams {
    source: IWordInputData;
    groupedData: GroupedInputData;
}

function findDependencyIntersectionTypes(sourceA: ITranslationData, sourceB: ITranslationData) {
    const intersection = [];

    for (const dependencyType of possibleDependencies) {
        if (sourceA.isEnabled[dependencyType] !== sourceB.isEnabled[dependencyType]) {
            continue;
        }

        if (sourceA.values[dependencyType] !== sourceB.values[dependencyType]) {
            continue;
        }

        intersection.push(dependencyType);
    }

    return intersection;
}

function resolveSingleDependency({groupedData, dependencyType, dependencySource}: IResolveSingleDependencyParams) {
    const dependencyValue = dependencySource.translationData.values[dependencyType];

    const wordsWithSameDependency = groupedData[dependencyType][dependencyValue];

    if (!wordsWithSameDependency || !wordsWithSameDependency.length) {
        throw new UnresolvableDependencyException(`No words exist with the desired dependency "${dependencyValue}"`);
    }

    const wordsWithSameDependencyBesidesSelf = wordsWithSameDependency.filter(data => data.word !== dependencySource.word);

    if (!wordsWithSameDependencyBesidesSelf.length) {
        throw new UnresolvableDependencyException(`Impossible to resolve dependency "${dependencyValue}" without comparison dependencies`);
    }

    console.log('same dependency words:', wordsWithSameDependencyBesidesSelf);
    console.log(dependencySource);

    for (let i = 0; i < wordsWithSameDependencyBesidesSelf.length - 1; ++i) {
        for (let j = i + 1; j < wordsWithSameDependencyBesidesSelf.length; ++j) {
            const wordA = wordsWithSameDependencyBesidesSelf[i];
            const wordB = wordsWithSameDependencyBesidesSelf[j];

            const intersection = findDependencyIntersectionTypes(wordA.translationData, wordB.translationData);

            console.log(intersection);

            const isOnlyOneDifferent = (possibleDependencies.length - intersection.length) === 1;

            console.log('can the missing one be resolved:', isOnlyOneDifferent);

            if (intersection.length !== 1) {
                continue;
            }

            const [sharedDependency] = intersection;

            if (sharedDependency === dependencyType) {
                return longestCommonSubstring(wordA.word, wordB.word);
            }
        }
    }

    return;
}

function resolveDependencyBase({source, groupedData}: IResolveDependencyBaseParams) {
    const dependenciesToResolve = getAvailableDependencies(source.translationData);
    const resolvedDependencies = {};

    for (const dependencyType of dependenciesToResolve) {
        resolvedDependencies[dependencyType] = resolveSingleDependency({
            dependencyType,
            dependencySource: source,
            groupedData
        });
    }

    return resolvedDependencies;
}

const dogData = {
    myDog: {
        word: 'mydog',n
        translationData: {
            isEnabled: {
                [TranslationDataType.base]: true,
                [TranslationDataType.pronoun]: true
            },
            values: {
                [TranslationDataType.base]: 'dog',
                [TranslationDataType.pronoun]: 'my'
            }
        }
    },
    ourDog: {
        word: 'ourdog',
        translationData: {
            isEnabled: {
                [TranslationDataType.base]: true,
                [TranslationDataType.pronoun]: true
            },
            values: {
                [TranslationDataType.base]: 'dog',
                [TranslationDataType.pronoun]: 'our'
            }
        }
    },
    wantedDog: {
        word: 'dog',
        translationData: {
            isEnabled: {
                [TranslationDataType.base]: true,
                [TranslationDataType.adjective]: false
            },
            values: {
                [TranslationDataType.base]: 'dog',
                [TranslationDataType.adjective]: 'big'
            }
        }
    }
};

// TODO: Update params to be value arrays
function translate(inputValues: IInputState, outputValues: IInputState) {
    const inputGroup = groupValues([dogData.myDog, dogData.ourDog]);

    const dog = resolveDependencyBase({
        groupedData: inputGroup,
        source: dogData.wantedDog
    });

    console.log(dog);
}

translate({ currentId: 0, values: {} }, { currentId: 0, values: {} });

export default translate;