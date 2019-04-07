import * as React from 'react';
import styled from 'styled-components';
import strings from '../../../config/strings';
import Card from '../../styled/Card';
import ConsonantChart from './ConsonantChart';
import VowelChart from './VowelChart';

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export default function IPACharts() {
    return (
        <Card title={strings.ipaCharts.title}>
            <ChartContainer>
                <ConsonantChart/>
                <VowelChart/>
            </ChartContainer>
        </Card>
    );
}