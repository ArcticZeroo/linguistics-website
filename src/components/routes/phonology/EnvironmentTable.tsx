import * as React from 'react';
import styled from 'styled-components';
import { IEnvironmentData } from '../../../api/linguistics/phonology/environment';

const StyledTable = styled.table`
  margin: 1rem;
`;

interface IEnvironmentTable {
    symbol: string;
    data: IEnvironmentData;
}

const EnvironmentTable: React.FC<IEnvironmentTable> = ({ symbol, data }) => {
    function buildRows() {
        const rows = [];

        for (const leftSymbol of Object.keys(data.leftToRight)) {
            for (const rightSymbol of Object.keys(data.leftToRight[leftSymbol])) {
                rows.push(
                    <tr>
                        <td>
                            {leftSymbol}
                        </td>
                        <td/>
                        <td>
                            {rightSymbol}
                        </td>
                    </tr>
                );
            }
        }

        return rows;
    }

    return (
        <StyledTable>
            <tbody>
                <tr>
                    <td/>
                    <th>
                        {symbol}
                    </th>
                    <td/>
                </tr>
                {buildRows()}
            </tbody>
        </StyledTable>
    );
};

export default EnvironmentTable;