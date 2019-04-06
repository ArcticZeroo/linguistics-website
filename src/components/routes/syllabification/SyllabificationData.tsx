import * as React from 'react';
import styled from 'styled-components';
import { ISyllable } from '../../../api/linguistics/phonology/syllabification';
import SyllabificationBreakdown from './SyllabificationBreakdown';
import SyllabificationTree from './SyllabificationTree';

const SyllabificationDataContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export interface ISyllabificationDataProps {
    word: string;
    syllables: ISyllable[];
}

const SyllabificationData: React.FC<ISyllabificationDataProps> = (data) => {
    return (
        <SyllabificationDataContainer>
            <SyllabificationTree {...data} />
            <SyllabificationBreakdown {...data} />
        </SyllabificationDataContainer>
    );
};

export default SyllabificationData;