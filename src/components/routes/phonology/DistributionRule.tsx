import * as React from 'react';
import { EnvironmentSymbolsDataMap } from '../../../api/linguistics/phonology/environment';
import strings from '../../../config/strings';
import ErrorCard from '../../styled/ErrorCard';

interface IDistributionRuleProps {
    symbols: string[];
    environmentDataMap: EnvironmentSymbolsDataMap;
}

const DistributionRule: React.FC<IDistributionRuleProps> = ({ symbols, environmentDataMap }) => {
    if (symbols.length !== 2) {
        // return (
        //     <ErrorCard title={strings.phoneticEnvironment.distributionRule.invalidSymbolsTitle}>
        //         {strings.phoneticEnvironment.distributionRule.invalidSymbolsBody}
        //     </ErrorCard>
        // );
        return null;
    }

    return null;
};

export default DistributionRule;