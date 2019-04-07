import * as React from 'react';
import styled from 'styled-components';
import {
    findEnvironments,
    IEnvironmentParams
} from '../../../api/linguistics/phonology/environment';
import DistributionInformation from './DistributionInformation';
import EnvironmentTableList from './EnvironmentTableList';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

interface IPhoneticEnvironmentDataProps {
    environmentParams: IEnvironmentParams;
}

const PhoneticEnvironmentData: React.FC<IPhoneticEnvironmentDataProps> = ({ environmentParams }) => {
    const environmentDataMap = findEnvironments(environmentParams);

    return (
        <Container>
            <EnvironmentTableList dataMap={environmentDataMap} />
            <DistributionInformation environmentParams={environmentParams} environmentDataMap={environmentDataMap} />
        </Container>
    );
};

export default PhoneticEnvironmentData;