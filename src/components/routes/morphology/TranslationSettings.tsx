import * as React from 'react';
import styled from 'styled-components';
import strings from '../../../config/strings';
import StyledInput from '../../styled/StyledInput';
import ToggleInput from '../../styled/ToggleInput';

const TranslationDataContainer = styled.table`
`;

const TranslationInputContainer = styled.tr`
  margin-bottom: 0.5rem;
  min-height: 2rem;
`;

const TranslationInputLabel = styled.td`
`;

export interface ITranslationData {
    hasAdjective: boolean;
    isPlural: boolean;
    hasPronoun: boolean;
    baseWord: string;
    adjective: string;
    pronoun: string;
}

export function createDefaultTranslationData(): ITranslationData {
    return {
        hasPronoun: false,
        hasAdjective: false,
        isPlural: false,
        baseWord: '',
        adjective: '',
        pronoun: ''
    };
}

interface IBooleanInputProps {
    label: string;
    booleanPropName: string;
    currentData: ITranslationData;

    onChange(data: ITranslationData): void;
}

const BooleanInput: React.FC<IBooleanInputProps> = ({ label, currentData, booleanPropName, onChange }) => {
    const isChecked = currentData[booleanPropName];

    function onCheckboxChecked() {
        onChange({
            ...currentData,
            [booleanPropName]: !isChecked
        });
    }

    return (
        <>
            <TranslationInputLabel>
                {label}
            </TranslationInputLabel>
            <td>
                <ToggleInput isChecked={isChecked} onClick={onCheckboxChecked}/>
            </td>
        </>
    );
};

interface IConditionalInputProps extends IBooleanInputProps {
    valuePropName: string;
}

const ConditionalInput: React.FC<IConditionalInputProps> = ({ label, booleanPropName, valuePropName, onChange, currentData }) => {
    function onValueChanged(event: React.ChangeEvent<HTMLInputElement>) {
        onChange({
            ...currentData,
            [valuePropName]: event.target.value
        });
    }

    const isReadOnly = !currentData[booleanPropName];

    return (
        <>
            <BooleanInput
                label={label}
                booleanPropName={booleanPropName}
                currentData={currentData}
                onChange={onChange}
            />

            <td>
                <StyledInput
                    value={currentData[valuePropName]}
                    onChange={onValueChanged}
                    readOnly={isReadOnly}
                    title={isReadOnly ? strings.morphology.inputs.readOnlyData : ''}
                />
            </td>
        </>
    );
};

interface ITranslationSettingsProps {
    data: ITranslationData;

    onChange(data: ITranslationData): void;
}

const TranslationSettings: React.FC<ITranslationSettingsProps> = ({ data, onChange }) => {
    function onBaseWordChange(event: React.ChangeEvent<HTMLInputElement>) {
        onChange({
            ...data,
            baseWord: event.target.value
        });
    }

    return (
        <TranslationDataContainer>
            <tbody>
            <TranslationInputContainer>
                <td>
                    Base Word
                </td>
                <td/>
                <td>
                    <StyledInput value={data.baseWord} onChange={onBaseWordChange} required={true}/>
                </td>
            </TranslationInputContainer>
            <TranslationInputContainer>
                <ConditionalInput
                    label="Adjective?"
                    booleanPropName="hasAdjective"
                    valuePropName="adjective"
                    currentData={data}
                    onChange={onChange}
                />
            </TranslationInputContainer>
            <TranslationInputContainer>
                <ConditionalInput
                    label="Pronoun?"
                    booleanPropName="hasPronoun"
                    valuePropName="pronoun"
                    currentData={data}
                    onChange={onChange}
                />
            </TranslationInputContainer>
            <TranslationInputContainer>
                <BooleanInput
                    label="Plural?"
                    booleanPropName="isPlural"
                    currentData={data}
                    onChange={onChange}
                />
            </TranslationInputContainer>
            </tbody>
        </TranslationDataContainer>
    );
};

export default TranslationSettings;