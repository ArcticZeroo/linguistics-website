import * as React from 'react';
import styled from 'styled-components';
import strings from '../../../../config/strings';
import StyledInput from '../../../styled/StyledInput';
import MaterialIcon from '../../../util/icons/MaterialIcon';
import TranslationSettings, { ITranslationData } from '../TranslationSettings';

const DeleteButton = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #212121;
  border-radius: 100%;
  transition: color 0.25s ease, background-color 0.25s ease;
  
  :hover {
      color: white;
      background: ${strings.colors.brightRed};
  }
`;

const PrimaryInput = styled.td`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-right: 1rem;
  height: 100%;
`;

const InputLabel = styled.label`
  font-family: ${strings.css.googleFontFamily};
`;

interface IInputEntryProps {
    id: number;
    word: string;
    translationData: ITranslationData;
    entryName: string;
    canBaseBeDisabled?: boolean;

    onValueChanged(id: number, value: string): void;

    onTranslationDataChanged(id: number, data: ITranslationData): void;

    onDelete(id: number, event: React.MouseEvent<HTMLDivElement>): void;
}

const InputEntry: React.FC<IInputEntryProps> = ({ id, word, translationData, entryName, canBaseBeDisabled, onValueChanged, onTranslationDataChanged, onDelete }: IInputEntryProps) => {
    console.log('created entry with id', id);

    return (
        <>
            <tr>
                <td>
                    <InputLabel>
                        {entryName}
                    </InputLabel>
                </td>
                <td>
                    <InputLabel>
                        Translation Settings (English)
                    </InputLabel>
                </td>
                <td/>
            </tr>
            <tr>
                <PrimaryInput>
                    <StyledInput value={word} onChange={e => onValueChanged(id, e.target.value)} required={true}/>
                </PrimaryInput>
                <td>
                    <TranslationSettings
                        settings={translationData}
                        canBaseBeDisabled={canBaseBeDisabled}
                        onChange={data => onTranslationDataChanged(id, data)}
                    />
                </td>
                <td>
                    <DeleteButton onClick={e => onDelete(id, e)} title={strings.morphology.inputs.deleteHoverText}>
                        <MaterialIcon icon="delete"/>
                    </DeleteButton>
                </td>
            </tr>
        </>
    );
};

export default InputEntry;