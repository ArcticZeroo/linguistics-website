import * as React from 'react';
import styled from 'styled-components';
import strings from '../../config/strings';
import HeaderNavigation from './HeaderNavigation';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  font-family: "Google Sans", "Roboto", sans-serif;
  color: white;
`;
const HeaderTitleContainer = styled.div`
  font-size: 1.5em;
`;

const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <HeaderTitleContainer>
                {strings.siteName}
            </HeaderTitleContainer>
            <HeaderNavigation/>
        </HeaderContainer>
    );
};

export default Header;