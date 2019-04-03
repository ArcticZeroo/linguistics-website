import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import routes from '../../config/routes';

const NavigationContainer = styled.div`
  
`;

const RouteLinksContainer = styled.div`
    margin-top: 0.5rem;

    a {
        color: #CCC;
        text-decoration: none;
        padding: 0.75rem;
        transition: color 0.25s ease;
        border-radius: 1.5rem;
        
        :hover {
          color: white;
        }
    }
`;

const createRouteLinks = () => Object.values(routes)
    .map(route => (<NavLink to={route.url} key={route.title} activeStyle={{ color: 'white' }} activeClassName={'active7'}>{route.title}</NavLink>));

const HeaderNavigation: React.FC = () => {
    return (
        <NavigationContainer>
            <RouteLinksContainer>
                {createRouteLinks()}
            </RouteLinksContainer>
        </NavigationContainer>
    );
};

export default HeaderNavigation;