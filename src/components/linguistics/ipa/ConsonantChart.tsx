import * as React from 'react';
import styled from 'styled-components';
import consonants, {
    mannerOfArticulationOrder,
    placeOfArticulationOrder,
    voicingOrder
} from '../../../api/linguistics/ipa/consonants';
import strings from '../../../config/strings';
import Optional from '../../../models/Optional';

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
  background: #FAFAFA;
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: inline-block;
`;

const RowLabel = styled.td`
  font-weight: bold;
`;

const ColumnLabel = styled.th`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

const YAxisLabel = styled.div`
    writing-mode: vertical-rl;
    text-orientation: mixed;
    transform: rotate(180deg);
    text-align: center;
    display: inline-block;
`;

const XAxisLabel = styled.div`
  text-align: center;
`;

const ChartWithLabelsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChartContainer = styled.div`
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
            <RowLabel key={`manner-${mannerOfArticulation}`}>
                {strings.mannerOfArticulation[mannerOfArticulation]}
            </RowLabel>
        ];

        for (const placeOfArticulation of placeOfArticulationOrder) {
            const placeData = mannerData[placeToIndex[placeOfArticulation]];
            const entry = [];

            for (const voicing of voicingOrder) {
                const sound = placeData[voicingToIndex[voicing]];

                entry.push(
                    <td key={`${mannerOfArticulation}-${placeOfArticulation}-${voicing}`}>
                        <SoundContainer>
                            {sound}
                        </SoundContainer>
                    </td>
                );
            }

            row.push(
                ...entry
            );
        }

        rows.push(
            <tr>
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
        <ChartWithLabelsContainer>
            <XAxisLabel>
                {strings.ipaChart.xAxisLabel}
            </XAxisLabel>
            <ChartContainer>
                <YAxisLabel>
                    {strings.ipaChart.yAxisLabel}
                </YAxisLabel>
                <TableComponent>
                    <tbody>
                    <ConsonantChartHeader/>
                    <ConsonantChartBody/>
                    </tbody>
                </TableComponent>
            </ChartContainer>
        </ChartWithLabelsContainer>
    );
};

export default ConsonantChart;