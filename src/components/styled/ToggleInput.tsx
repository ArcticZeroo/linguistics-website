import * as React from 'react';
import styled from 'styled-components';

interface IToggleStyledComponentProps {
    isChecked: boolean;
}

const heightInRem = 1.5;
const widthInRem = 3;
const animationLength = `0.15s`;

const ToggleContainer = styled.div<IToggleStyledComponentProps>`
  height: ${heightInRem}rem;
  width: ${widthInRem}rem;
  border-radius: ${heightInRem / 2}rem;
  background: ${props => props.isChecked ? '#2196F3' : '#BBB'};
  position: relative;
  transition: background-color ${animationLength} ease;
  cursor: pointer;
  margin: 0.5rem;
  
  :hover {
    background: ${props => props.isChecked ? '#1c83d4' : '#AAA'};
  }
`;

const ToggleIndicator = styled.div<IToggleStyledComponentProps>`
  width: ${heightInRem}rem;
  height: ${heightInRem}rem;
  background: #EEE;
  border-radius: 100%;
  position: absolute;
  transition: left ${animationLength} ease;
  left: ${props => props.isChecked ? `${widthInRem - heightInRem}rem` : '0'};
`;

interface IToggleInputProps {
    isChecked: boolean;
    onClick(event: React.MouseEvent): void;
}

const ToggleInput: React.FC<IToggleInputProps> = ({ isChecked, onClick }) => {
    return (
        <ToggleContainer onClick={onClick} isChecked={isChecked}>
            <ToggleIndicator isChecked={isChecked}/>
        </ToggleContainer>
    );
};

export default ToggleInput;