import * as React from 'react';
import { IResolvedDependency } from '../../../api/linguistics/morphology/DependencyResolver';
import { formatMorpheme, MorphemeType } from '../../../api/linguistics/morphology/morpheme';
import strings from '../../../config/strings';
import Card from '../../styled/card/Card';
import { IWordInputData } from './input/InputsTable';

interface IDependencyResultProps {
    source: IWordInputData;
    resolvedDependencies: { [type: string]: IResolvedDependency };
}

const unsupportedHowToSayTypes = [MorphemeType.unknown, MorphemeType.infix, MorphemeType.circumfix];

const DependencyResult: React.FC<IDependencyResultProps> = ({ source, resolvedDependencies }) => {
    const rows = [];
    let isHowToSaySupported = true;

    const morphemePieces = {
        [MorphemeType.prefix]: [],
        [MorphemeType.suffix]: []
    };

    const resolvedRoot = resolvedDependencies[MorphemeType.root] || {};
    const root = resolvedRoot.value || '';

    for (const dependencyType of Object.keys(resolvedDependencies)) {
        const {type, value} = resolvedDependencies[dependencyType];

        rows.push(
            <tr>
                <td>
                    {strings.translationDataType[dependencyType]}
                </td>
                <td>
                    {source.translationData.values[dependencyType]}
                </td>
                <td>
                    {formatMorpheme(resolvedDependencies[dependencyType])}
                </td>
            </tr>
        );

        if (unsupportedHowToSayTypes.includes(type)) {
            isHowToSaySupported = false;
        }

        if (morphemePieces.hasOwnProperty(type)) {
            morphemePieces[type].push(value);
        }
    }

    let howToSayComponent = null;

    if (isHowToSaySupported) {
        console.log(root, morphemePieces);

        const howToSayString = `${morphemePieces[MorphemeType.prefix].join('')}${root}${morphemePieces[MorphemeType.suffix].join('')}`;

        console.log(howToSayString);

        howToSayComponent = (
            <div>
                "{source.word}" would be said as the following: {howToSayString}
            </div>
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
            {howToSayComponent}
        </Card>
    )
};

export default DependencyResult;