import * as React from 'react';
import AddButton from '../../../styled/AddButton';
import FlexCenteredColumn from '../../../styled/FlexCenteredColumn';
import { createDefaultTranslationData, ITranslationData } from '../TranslationSettings';
import InputEntry from './InputEntry';

export interface IInputState {
    currentId: number;
    values: { [id: number]: IWordInputData };
}

interface IWordInputData {
    word: string;
    translationData: ITranslationData;
}

export function createDefaultWordInputData(): IWordInputData {
    return {
        word: '',
        translationData: createDefaultTranslationData()
    };
}

interface IInputsTableProps {
    entryName: string;
    state: IInputState;

    setState(newState: IInputState): void;
}

const InputsTable: React.FC<IInputsTableProps> = ({ state: { values, currentId }, setState, entryName }) => {
    function onTranslationDataChanged(id: number, translationData: ITranslationData) {
        console.log(values, id, translationData);

        setState({
            currentId,
            values: {
                ...values,
                [id]: {
                    word: values[id].word,
                    translationData
                }
            }
        });
    }

    function onWordChanged(id: number, word: string) {
        setState({
            currentId,
            values: {
                ...values,
                [id]: {
                    word,
                    translationData: values[id].translationData
                }
            }
        });
    }

    function onDeleted(id: number) {
        if (Object.keys(values).length === 1) {
            setState({
                currentId,
                values: {
                    [id]: createDefaultWordInputData()
                }
            });
            return;
        }

        const copyValues = { ...values };
        delete copyValues[id];

        setState({
            currentId,
            values: copyValues
        });
    }

    function onInputAdded() {
        const nextId = currentId + 1;

        setState({
            currentId: nextId,
            values: {
                ...values,
                [nextId]: createDefaultWordInputData()
            }
        });
    }

    function buildInputs() {
        const inputs = [];

        for (const key of Object.keys(values)) {
            const id = parseInt(key);

            inputs.push(
                <InputEntry
                    id={id}
                    onValueChanged={onWordChanged}
                    onTranslationDataChanged={onTranslationDataChanged}
                    onDelete={onDeleted}
                    key={`input-${id}`}
                    translationData={values[id].translationData}
                    word={values[id].word}
                    entryName={entryName}
                />
            );
        }

        return inputs;
    }

    return (
        <FlexCenteredColumn>
            <table>
                <tbody>
                {buildInputs()}
                </tbody>
            </table>
            <AddButton text="Add Word" onClick={onInputAdded}/>
        </FlexCenteredColumn>
    );
};

export default InputsTable;