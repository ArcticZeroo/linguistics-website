import styled from 'styled-components';

const FlatButton = styled.button`
  padding: 0.5rem;
  margin: 0.5rem;
  background: #EEE;
  border-radius: 0.25rem;
  color: black;
  cursor: pointer;
  outline: none;
  border: none;
  min-width: 6rem;
  box-shadow: 0 0 0.125rem 0.2rem rgba(55, 55, 55, 0.125);
  transition: box-shadow,background-color 0.25s ease;
  
  :hover {
    box-shadow: 0 0 0.125rem 0.3rem rgba(55, 55, 55, 0.2);
    background-color: white;
  }
`;

export default FlatButton;