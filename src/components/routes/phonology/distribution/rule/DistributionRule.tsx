import * as React from 'react';
import { findDistributionRule } from '../../../../../api/linguistics/phonology/distribution-rule';
import { EnvironmentSymbolsDataMap, IDistributionData } from '../../../../../api/linguistics/phonology/environment';
import strings from '../../../../../config/strings';
import { ErrorCard } from '../../../../styled/card/colored-cards';

interface IDistributionRuleProps {
    symbols: [string, string];
    environmentDataMap: EnvironmentSymbolsDataMap;
    distribution: IDistributionData;
}

const DistributionRule: React.FC<IDistributionRuleProps> = ({ environmentDataMap, symbols, distribution }) => {
    findDistributionRule(symbols, environmentDataMap, distribution);

    return null;
};

export default DistributionRule;