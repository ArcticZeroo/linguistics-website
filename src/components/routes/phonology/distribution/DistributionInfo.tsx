import * as React from 'react';
import {
    Distribution,
    EnvironmentSymbolsDataMap,
    findPairDistribution, IDistributionData,
    IEnvironmentParams
} from '../../../../api/linguistics/phonology/environment';
import DistributionList from './DistributionList';
import DistributionRule from './rule/DistributionRule';

type SymbolPairMap = {
    [left: string]: {
        [right: string]: IDistributionData
    }
};

export type DistributionMap = {
    [Distribution.complementary]: SymbolPairMap;
    [Distribution.overlapping]: SymbolPairMap;
}

function findDistributions({ symbols }: IEnvironmentParams, environmentDataMap: EnvironmentSymbolsDataMap): DistributionMap {
    const distributions: DistributionMap = {
        [Distribution.complementary]: {},
        [Distribution.overlapping]: {}
    };

    for (let i = 0; i < symbols.length - 1; ++i) {
        const symbolI = symbols[i];

        for (let j = i + 1; j < symbols.length; ++j) {
            const symbolJ = symbols[j];

            const distributionData = findPairDistribution(environmentDataMap[symbolI], environmentDataMap[symbolJ]);

            if (!distributions[distributionData.overall][symbolI]) {
                distributions[distributionData.overall][symbolI] = {};
            }

            distributions[distributionData.overall][symbolI][symbolJ] = distributionData;
        }
    }

    return distributions;
}

interface IDistributionInformationProps {
    environmentParams: IEnvironmentParams;
    environmentDataMap: EnvironmentSymbolsDataMap;
}

const DistributionInfo: React.FC<IDistributionInformationProps> = ({ environmentParams, environmentDataMap }) => {
    if (environmentParams.symbols.length <= 1) {
        return null;
    }

    const distributions = findDistributions(environmentParams, environmentDataMap);
    const [symbolA, symbolB] = environmentParams.symbols;

    return (
        <>
            <DistributionList data={distributions}/>
            {environmentParams.symbols.length === 2 && <DistributionRule environmentDataMap={environmentDataMap} symbols={[symbolA, symbolB]} distribution={distributions[symbolA]} />}
        </>
    );
};

export default DistributionInfo;