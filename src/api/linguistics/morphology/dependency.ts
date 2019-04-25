import { IWordInputData } from '../../../components/routes/morphology/input/InputsTable';
import { ITranslationData, TranslationDataType } from '../../../components/routes/morphology/TranslationSettings';

export const possibleDependencies = [TranslationDataType.root, TranslationDataType.adjective, TranslationDataType.determiner, TranslationDataType.plural];

interface IDataByDependency<T> {
    [TranslationDataType.root]: T;
    [TranslationDataType.adjective]: T;
    [TranslationDataType.determiner]: T;
    [TranslationDataType.plural]: T;
}

export interface IDependency {

}

export type GroupedInputData = { [type: number]: { [value: string]: IWordInputData[] } };

export function groupValues(wordDataList: IWordInputData[]): GroupedInputData {
    const grouped: GroupedInputData = {};

    for (const dataType of [TranslationDataType.root, TranslationDataType.adjective, TranslationDataType.plural, TranslationDataType.determiner]) {
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

// a dependency is considered common when, for every word, the dependency is enabled and the same value
function mergeCommonDependencyData(source: ITranslationData, challenger: ITranslationData) {
    // isEnabled represents a dependency currently considered "common"
    // value represents the current common value for a common dependency
    for (const dependencyType of Object.keys(source.isEnabled)) {
        if (!source.isEnabled[dependencyType]) {
            continue;
        }

        if (!source.values[dependencyType]) {
            source.values[dependencyType] = challenger.values[dependencyType];
        }

        if (!challenger.isEnabled[dependencyType] || source.values[dependencyType] !== challenger.values[dependencyType]) {
            source.isEnabled[dependencyType] = false;
        }
    }
}

export function findCommonDependenciesFromList(words: IWordInputData[]) {
    const commonDependencyData: ITranslationData = {
        isEnabled: {
            [TranslationDataType.root]: true,
            [TranslationDataType.adjective]: true,
            [TranslationDataType.determiner]: true,
            [TranslationDataType.plural]: true
        },
        values: {}
    };

    for (const word of words) {
        mergeCommonDependencyData(commonDependencyData, word.translationData);
    }

    return commonDependencyData;
}

export function* generateAvailableDependencies(source: ITranslationData): IterableIterator<TranslationDataType> {
    for (const possibleDependency of possibleDependencies) {
        if (source.isEnabled[possibleDependency]) {
            yield possibleDependency;
        }
    }
}

export function getAvailableDependencies(source: ITranslationData): TranslationDataType[] {
    return Array.from(generateAvailableDependencies(source));
}