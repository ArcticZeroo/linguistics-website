import { IInputState, IWordInputData } from '../../../components/routes/morphology/input/InputsTable';
import { TranslationDataType } from '../../../components/routes/morphology/TranslationSettings';

type GroupedInputData = { [type: number]: { [value: string]: IWordInputData[] } };

function groupData(data: IInputState): {} {
    const grouped: GroupedInputData = {};

    for (const dataType of [TranslationDataType.base, TranslationDataType.adjective, TranslationDataType.plural, TranslationDataType.pronoun]) {
        grouped[dataType] = {};
    }

    for (const id of Object.keys(data.values)) {
        const wordData: IWordInputData = data.values[id];

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

interface IResolveRequirementsParams {
    inputData: IWordInputData;
    groupedData: GroupedInputData;

}

function resolveDependency(inputData: IWordInputData, groupedData: GroupedInputData) {
}

function translate(inputState: IInputState, outputState: IInputState) {
}

export default translate;