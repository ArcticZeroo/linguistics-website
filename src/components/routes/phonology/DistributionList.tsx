import * as React from 'react';
import styled from 'styled-components';
import StringUtil from '../../../api/util/StringUtil';
import strings from '../../../config/strings';
import { InfoCard } from '../../styled/card/colored-cards';
import { DistributionData } from './DistributionData';

interface IDistributionListProps {
    data: DistributionData;
}

const DistributionBreakdownContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DistributionInformationContainer = styled.div`
  margin-top: 0.125rem;
  margin-bottom: 0.125rem;
`;
const DistributionChunkTitle = styled.div`
  font-size: 1.15em;
  font-family: ${strings.css.googleFontFamily};
`;
const DistributionChunkElements = styled.div`

`;

const DistributionList: React.FC<IDistributionListProps> = ({ data }) => {
    function buildDistributionChunk(leftSymbol: string, rightPairs: { [symbol: string]: boolean }) {
        const pairs = [];

        for (const rightSymbol of Object.keys(rightPairs)) {
            pairs.push(`[${leftSymbol}] + [${rightSymbol}]`);
        }

        return pairs;
    }

    function buildDistributionElements() {
        const elements = [];

        for (const distribution of Object.keys(data)) {
            const distributionElements = data[distribution];
            const aggregatedSymbols = [];

            for (const leftSymbol of Object.keys(distributionElements)) {
                aggregatedSymbols.push(...buildDistributionChunk(leftSymbol, distributionElements[leftSymbol]))
            }

            elements.push(
                <DistributionInformationContainer key={`distribution-${distribution}`}>
                    <DistributionChunkTitle>
                        {aggregatedSymbols.length} {StringUtil.getPluralizedString('Symbol', aggregatedSymbols.length)} in {strings.distribution[distribution]} Distribution
                    </DistributionChunkTitle>
                    <DistributionChunkElements>
                        {aggregatedSymbols.join(', ')}
                    </DistributionChunkElements>
                </DistributionInformationContainer>
            );
        }

        return elements;
    }

    return (
        <InfoCard title={'Distributions'}>
            <DistributionBreakdownContainer>
                {buildDistributionElements()}
            </DistributionBreakdownContainer>
        </InfoCard>
    );
};

export default DistributionList;