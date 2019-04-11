import * as React from 'react';
import styled from 'styled-components';
import SyllabifyWord from './SyllabifyWord';
import WordRhymeCheck from './WordRhymeCheck';

const RouteContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
`;

export default () => {
    return (
        <RouteContainer>
            <SyllabifyWord/>
            <WordRhymeCheck/>
        </RouteContainer>
    );
}