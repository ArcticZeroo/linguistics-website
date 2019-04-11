import * as React from 'react';
import styled from 'styled-components';
import strings from '../../config/strings';
import MaterialIcon from '../util/icons/MaterialIcon';

const ButtonContainer = styled.button`
  font-family: ${strings.css.googleFontFamily};
  border-radius: 2rem;
  border: none;
  background: #1749b4;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 0;
  padding-left: 0.75rem;
  cursor: pointer;
`;

const AddIcon = styled.div`
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.25rem;
`;

interface IAddInputButtonProps {
    text: string;
    onClick(): void;
}

const AddButton: React.FC<IAddInputButtonProps> = ({ text, onClick }) => {
    return (
        <ButtonContainer onClick={onClick}>
            {text}
            <AddIcon>
                <MaterialIcon icon="add"/>
            </AddIcon>
        </ButtonContainer>
    );
};

export default AddButton;