import * as React from 'react';
import AddButton from '../../styled/AddButton';
import InfiniteInputEntry from './InfiniteInputEntry';

export interface IInputData {
    currentId: number;
    values: { [id: number]: string };
}

interface IInfiniteInputsProps {
    addButtonText: string;
    onDataChange(data: IInputData): void;
    inputData: IInputData;
    onInputKeyDown?(event: React.KeyboardEvent<HTMLInputElement>): void;
}

const InfiniteInputs: React.FC<IInfiniteInputsProps> = ({ addButtonText, onDataChange, inputData, onInputKeyDown }) => {
    function onAddInputClick() {
        const nextId = inputData.currentId;

        onDataChange({
            currentId: nextId + 1,
            values: { ...inputData.values, [nextId]: '' }
        });
    }

    function onInputChange(id: number, value: string) {
        onDataChange({
            currentId: inputData.currentId,
            values: { ...inputData.values, [id]: value }
        });
    }

    function onInputDelete(id: number) {
        if (Object.keys(inputData.values).length === 1) {
            onDataChange({
                currentId: inputData.currentId,
                values: { ...inputData.values, [id]: '' }
            });
            return;
        }

        const copyInput = { ...inputData.values };

        delete copyInput[id];

        onDataChange({
            currentId: inputData.currentId,
            values: copyInput
        });
    }

    function buildInputs() {
        const inputs = [];

        for (const key of Object.keys(inputData.values)) {
            const id = parseInt(key);

            if (Number.isNaN(id)) {
                continue;
            }

            inputs.push(
                <InfiniteInputEntry
                    id={id}
                    onChange={onInputChange}
                    onDelete={onInputDelete}
                    value={inputData.values[id]}
                    onKeyDown={onInputKeyDown}
                    key={`infinite-input-${id}`}
                />
            );
        }

        return inputs;
    }

    return (
        <>
            {buildInputs()}
            <AddButton text={addButtonText} onClick={onAddInputClick} />
        </>
    );
};

export default InfiniteInputs;