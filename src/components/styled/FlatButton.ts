import styled from 'styled-components';
import strings from '../../config/strings';

const FlatButton = styled.button`
  padding: 0.5rem;
  background: #2196F3;
  border-radius: 0.25rem;
  color: white;
  cursor: pointer;
  outline: none;
  border: none;
  min-width: 6rem;
  transition: box-shadow 0.25s ease;
  font-family: ${strings.css.googleFontFamily};
`;

export default FlatButton;