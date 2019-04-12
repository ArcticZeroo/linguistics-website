import * as React from 'react';
import { EnvironmentSymbolsDataMap, IDistributionData } from '../../../../../api/linguistics/phonology/environment';
import strings from '../../../../../config/strings';
import { ErrorCard } from '../../../../styled/card/colored-cards';

interface IDistributionRuleProps {
    symbols: [string, string];
    environmentDataMap: EnvironmentSymbolsDataMap;
    distribution: IDistributionData;
}

const DistributionRule: React.FC<IDistributionRuleProps> = ({ environmentDataMap, symbols, distribution }) => {
    return null;
};

export default DistributionRule;