import * as React from 'react';
import styled from 'styled-components';
import { IEnvironmentData } from '../../../api/linguistics/phonology/environment';
import strings from '../../../config/strings';
import Card from '../../styled/card/Card';
import EnvironmentTable from './EnvironmentTable';

const TablesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface IEnvironmentTableListProps {
    dataMap: { [symbol: string]: IEnvironmentData };
}

const EnvironmentTableList: React.FC<IEnvironmentTableListProps> = ({ dataMap }) => {
    function buildContents() {
        const contents = [];

        for (const symbol of Object.keys(dataMap)) {
            contents.push(
                <EnvironmentTable data={dataMap[symbol]} symbol={symbol} key={`enviro-table-${symbol}`} />
            );
        }

        return contents;
    }

    return (
        <Card title={strings.phoneticEnvironment.tables.title}>
            <TablesContainer>
                {buildContents()}
            </TablesContainer>
        </Card>
    );
};

export default EnvironmentTableList;