import { useState } from 'react';
import * as React from 'react';
import AddButton from '../../styled/AddButton';
import InfiniteInputEntry from './InfiniteInputEntry';

export interface IInputData {
    currentId: number;
    values: { [id: number]: string };
}

interface IInfiniteInputsProps {
    addButtonText: string;
    onValuesChange(values: string[]): void;
}

const InfiniteInputs: React.FC<IInfiniteInputsProps> = ({ addButtonText }) => {
    const [inputData, setInputData] = useState<IInputData>({ currentId: 1, values: { 0: '' } });

    function onAddInputClick() {
        const nextId = inputData.currentId;

        setInputData({
            currentId: nextId + 1,
            values: { ...inputData.values, [nextId]: '' }
        });
    }

    function onInputChange(id: number, value: string) {
        setInputData({
            currentId: inputData.currentId,
            values: { ...inputData.values, [id]: value }
        });
    }

    function onInputDelete(id: number) {
        if (Object.keys(inputData.values).length === 1) {
            return;
        }

        const copyInput = { ...inputData.values };

        delete copyInput[id];

        setInputData({
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