import * as React from 'react';
import styled from 'styled-components';
import StyledInput from '../../styled/StyledInput';
import MaterialIcon from '../../util/MaterialIcon';

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  width: 100%;
`;

const DeleteButton = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #212121;
`;

interface IInfiniteInputEntryProps {
    id: number;
    value: string;
    onDelete(id: number): void;
    onChange(id: number, value: string): void;
    onKeyDown?(event: React.KeyboardEvent<HTMLInputElement>): void;
}

const InfiniteInputEntry: React.FC<IInfiniteInputEntryProps> = ({ id, value, onDelete, onChange, onKeyDown }) => {
    return (
        <InputContainer>
            <StyledInput value={value}
                         onChange={e => onChange(id, e.target.value)}
                         style={{ width: '100%' }}
                         onKeyDown={onKeyDown}
            />
            <DeleteButton onClick={() => onDelete(id)}>
                <MaterialIcon icon="delete" />
            </DeleteButton>
        </InputContainer>
    );
};

export default InfiniteInputEntry;