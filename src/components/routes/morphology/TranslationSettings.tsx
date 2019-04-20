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

export enum TranslationDataType {
    adjective,
    plural,
    pronoun
}

export interface ITranslationData {
    baseWord: string;
    enabled: { [type: number]: boolean }
    data: { [type: number]: string }
}

export function createDefaultTranslationData(): ITranslationData {
    return {
        baseWord: '',
        enabled: {},
        data: {}
    };
}

interface IBooleanInputProps {
    label: string;
    type: TranslationDataType;
    currentData: ITranslationData;

    onChange(data: ITranslationData): void;
}

const BooleanInput: React.FC<IBooleanInputProps> = ({ label, currentData, type, onChange }) => {
    const isChecked = currentData.enabled[type];

    function onCheckboxChecked() {
        onChange({
            ...currentData,
            enabled: {
                ...currentData.enabled,
                [type]: !isChecked
            }
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

const ConditionalInput: React.FC<IBooleanInputProps> = ({ label, type, onChange, currentData }) => {
    function onValueChanged(event: React.ChangeEvent<HTMLInputElement>) {
        onChange({
            ...currentData,
            data: {
                ...currentData.data,
                [type]: event.target.value
            }
        });
    }

    const isReadOnly = !currentData.enabled[type];

    return (
        <>
            <BooleanInput
                label={label}
                type={type}
                currentData={currentData}
                onChange={onChange}
            />

            <td>
                <StyledInput
                    value={currentData.data[type]}
                    onChange={onValueChanged}
                    readOnly={isReadOnly}
                    title={isReadOnly ? strings.morphology.inputs.readOnlyData : ''}
                    required={!isReadOnly}
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
                    type={TranslationDataType.adjective}
                    currentData={data}
                    onChange={onChange}
                />
            </TranslationInputContainer>
            <TranslationInputContainer>
                <ConditionalInput
                    label="Pronoun?"
                    type={TranslationDataType.pronoun}
                    currentData={data}
                    onChange={onChange}
                />
            </TranslationInputContainer>
            <TranslationInputContainer>
                <BooleanInput
                    label="Plural?"
                    type={TranslationDataType.plural}
                    currentData={data}
                    onChange={onChange}
                />
            </TranslationInputContainer>
            </tbody>
        </TranslationDataContainer>
    );
};

export default TranslationSettings;