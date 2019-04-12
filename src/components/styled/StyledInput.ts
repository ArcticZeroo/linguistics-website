import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  background: #DDD;
  transition: background-color 0.2s ease;
  
  :read-only {
    background: #EEE;
    cursor: not-allowed;
  }
`;

const maxWidthStyle = { width: 'calc(100% - 1rem)' };

export { maxWidthStyle };
export default StyledInput;