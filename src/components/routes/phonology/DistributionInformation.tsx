import * as React from 'react';
import {
    Distribution,
    EnvironmentDataMap,
    findPairDistribution,
    IEnvironmentParams
} from '../../../api/linguistics/phonology/environment';
import DistributionList from './DistributionList';

type SymbolPairMap = {
    [left: string]: {
        [right: string]: boolean
    }
};

export type DistributionData = {
    [Distribution.complementary]: SymbolPairMap;
    [Distribution.overlapping]: SymbolPairMap;
}

function findDistributions({ symbols }: IEnvironmentParams, environmentDataMap: EnvironmentDataMap): DistributionData {
    const distributions = {
        [Distribution.complementary]: {},
        [Distribution.overlapping]: {}
    };

    for (let i = 0; i < symbols.length - 1; ++i) {
        const symbolI = symbols[i];

        for (let j = i + 1; j < symbols.length; ++j) {
            const symbolJ = symbols[j];

            const distribution = findPairDistribution(environmentDataMap[symbolI], environmentDataMap[symbolJ]);

            if (!distributions[distribution][symbolI]) {
                distributions[distribution][symbolI] = {};
            }

            distributions[distribution][symbolI][symbolJ] = true;
        }
    }

    return distributions;
}

interface IDistributionInformationProps {
    environmentParams: IEnvironmentParams;
    environmentDataMap: EnvironmentDataMap;
}

const DistributionInformation: React.FC<IDistributionInformationProps> = ({ environmentParams, environmentDataMap }) => {
    if (environmentParams.symbols.length <= 1) {
        return null;
    }

    const distributions = findDistributions(environmentParams, environmentDataMap);

    return (
        <DistributionList data={distributions} />
    );
};

export default DistributionInformation;