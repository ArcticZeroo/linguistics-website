import * as React from 'react';
import styled from 'styled-components';
import consonants, {
    mannerOfArticulationOrder,
    placeOfArticulationOrder,
    voicingOrder
} from '../../../api/linguistics/ipa/consonants';
import strings from '../../../config/strings';
import Optional from '../../../models/Optional';
import SelectOnClick from '../../util/SelectOnClick';

/**
 * Maps unique array values to the indicies they appear in. Pretty much only useful for the place/manner of articulation
 * stuff, which could use an easy way to remap the values back to their indicies
 * @param array
 * @param map
 */
function mapValuesToIndicies<T>(array: T[], map: any): void {
    for (let i = 0; i < array.length; ++i) {
        map[array[i]] = i;
    }
}

const mannerToIndex = {};
const placeToIndex = {};
const voicingToIndex = {};

mapValuesToIndicies(mannerOfArticulationOrder, mannerToIndex);
mapValuesToIndicies(placeOfArticulationOrder, placeToIndex);
mapValuesToIndicies(voicingOrder, voicingToIndex);

function buildTableObject() {
    const mannerToPlaceToVoicing: Array<Array<Array<Optional<string>>>> = [];

    for (const mannerOfArticulation of mannerOfArticulationOrder) {
        const placeToVoicing = [];

        for (const placeOfArticulation of placeOfArticulationOrder) {
            const voicing: Array<Optional<string>> = [];

            for (const voicingType of voicingOrder) {
                voicing[voicingToIndex[voicingType]] = null;
            }

            placeToVoicing[placeToIndex[placeOfArticulation]] = voicing;
        }

        mannerToPlaceToVoicing[mannerToIndex[mannerOfArticulation]] = placeToVoicing;
    }

    for (const [sound, data] of Object.entries(consonants)) {
        mannerToPlaceToVoicing[mannerToIndex[data.manner]][placeToIndex[data.place]][voicingToIndex[data.voicing]] = sound;
    }

    return mannerToPlaceToVoicing;
}

const SoundContainer = styled.div`
  display: flex;
  flex: 1;
  text-align: center;
  justify-content: center;
`;

const TableComponent = styled.table`
  display: inline-block;
  margin: 1rem;
`;

const RowLabel = styled.td`
  font-weight: bold;
`;

const ColumnLabel = styled.th`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

const TableContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  flex-grow: 0;
`;

const ConsonantChartHeader = () => {
    const headerElements = [
        <th key={'EmptyTh'}/>
    ];

    for (const placeOfArticulation of placeOfArticulationOrder) {
        headerElements.push(
            <ColumnLabel key={`place-${placeOfArticulation}`} colSpan={2}>
                {strings.placesOfArticulation[placeOfArticulation]}
            </ColumnLabel>
        );
    }

    return (
        <tr>
            {headerElements}
        </tr>
    );
};

const ConsonantChartBody = () => {
    const tableData = buildTableObject();

    const rows = [];

    for (const mannerOfArticulation of mannerOfArticulationOrder) {
        const mannerData = tableData[mannerToIndex[mannerOfArticulation]];
        const row = [
            <RowLabel key={`label-manner-${mannerOfArticulation}`}>
                {strings.mannerOfArticulation[mannerOfArticulation]}
            </RowLabel>
        ];

        for (const placeOfArticulation of placeOfArticulationOrder) {
            const placeData = mannerData[placeToIndex[placeOfArticulation]];

            for (const voicing of voicingOrder) {
                const sound = placeData[voicingToIndex[voicing]];

                row.push(
                    <td key={`${mannerOfArticulation}-${placeOfArticulation}-${voicing}`}>
                        <SelectOnClick>
                            <SoundContainer
                                title={`${strings.voicing[voicing]} ${strings.placesOfArticulation[placeOfArticulation]} ${strings.mannerOfArticulation[mannerOfArticulation]}`}>
                                {sound}
                            </SoundContainer>
                        </SelectOnClick>
                    </td>
                );
            }
        }

        rows.push(
            <tr key={`manner-${mannerOfArticulation}`}>
                {row}
            </tr>
        );
    }

    return (
        <>
            {rows}
        </>
    );
};

const ConsonantChart: React.FC = () => {
    return (
        <TableContainer>
            <TableComponent>
                <tbody>
                <ConsonantChartHeader/>
                <ConsonantChartBody/>
                </tbody>
            </TableComponent>
        </TableContainer>
    );
};

export default ConsonantChart;