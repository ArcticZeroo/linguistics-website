import * as React from 'react';
import strings from '../../../config/strings';
import Card from '../../styled/card/Card';
import { IWordInputData } from './input/InputsTable';

interface IDependencyResultProps {
    source: IWordInputData;
    resolvedDependencies: { [type: string]: string };
}

const DependencyResult: React.FC<IDependencyResultProps> = ({ source, resolvedDependencies }) => {
    const rows = [];

    for (const type of Object.keys(resolvedDependencies)) {
        rows.push(
            <tr>
                <td>
                    {strings.translationDataType[type]}
                </td>
                <td>
                    {source.translationData.values[type]}
                </td>
                <td>
                    {resolvedDependencies[type]}
                </td>
            </tr>
        );
    }

    return (
        <Card title={`Results for "${source.word}"`}>
            <table>
                <tbody>
                <tr>
                    <th>
                        Type
                    </th>
                    <th>
                        Value
                    </th>
                    <th>
                        Morpheme
                    </th>
                </tr>
                {rows}
                </tbody>
            </table>
        </Card>
    )
};

export default DependencyResult;