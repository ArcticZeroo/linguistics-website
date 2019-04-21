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
    pronoun,
    base
}

export interface ITranslationData {
    isEnabled: { [type: number]: boolean }
    values: { [type: number]: string }
}

export function createDefaultTranslationData(): ITranslationData {
    return {
        isEnabled: {},
        values: {}
    };
}

interface IBooleanInputProps {
    label: string;
    type: TranslationDataType;
    currentData: ITranslationData;

    onChange(data: ITranslationData): void;
}

const BooleanInput: React.FC<IBooleanInputProps> = ({ label, currentData, type, onChange }) => {
    const isChecked = currentData.isEnabled[type];

    function onCheckboxChecked() {
        onChange({
            ...currentData,
            isEnabled: {
                ...currentData.isEnabled,
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
            values: {
                ...currentData.values,
                [type]: event.target.value
            }
        });
    }

    const isReadOnly = !currentData.isEnabled[type];

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
                    value={currentData.values[type]}
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
    settings: ITranslationData;
    canBaseBeDisabled?: boolean;

    onChange(data: ITranslationData): void;
}

const TranslationSettings: React.FC<ITranslationSettingsProps> = ({ settings, onChange, canBaseBeDisabled }) => {
    function onBaseWordChange(event: React.ChangeEvent<HTMLInputElement>) {
        onChange({
            ...settings,
            values: {
                [TranslationDataType.base]: event.target.value
            }
        });
    }

    return (
        <TranslationDataContainer>
            <tbody>
            <TranslationInputContainer>
                {
                    canBaseBeDisabled ? (
                        <ConditionalInput
                            label="Base Word"
                            type={TranslationDataType.base}
                            currentData={settings}
                            onChange={onChange}
                        />
                    ) : (
                        <>
                            <td>
                                Base Word
                            </td>
                            <td/>
                            <td>
                                <StyledInput value={settings.values[TranslationDataType.base]} onChange={onBaseWordChange} required={true}/>
                            </td>
                        </>
                    )
                }
            </TranslationInputContainer>
            <TranslationInputContainer>
                <ConditionalInput
                    label="Adjective?"
                    type={TranslationDataType.adjective}
                    currentData={settings}
                    onChange={onChange}
                />
            </TranslationInputContainer>
            <TranslationInputContainer>
                <ConditionalInput
                    label="Pronoun?"
                    type={TranslationDataType.pronoun}
                    currentData={settings}
                    onChange={onChange}
                />
            </TranslationInputContainer>
            <TranslationInputContainer>
                <BooleanInput
                    label="Plural?"
                    type={TranslationDataType.plural}
                    currentData={settings}
                    onChange={onChange}
                />
            </TranslationInputContainer>
            </tbody>
        </TranslationDataContainer>
    );
};

export default TranslationSettings;