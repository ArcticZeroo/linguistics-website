import * as React from 'react';
import styled from 'styled-components';
import { ISyllable } from '../../../api/linguistics/phonology/syllabification';
import StringUtil from '../../../api/util/StringUtil';
import strings from '../../../config/strings';
import Card from '../../styled/Card';
import { ISyllabificationDataProps } from './SyllabificationData';

const SyllabificationBreakdownContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SyllableInformationContainer = styled.div`
  margin-top: 0.125rem;
  margin-bottom: 0.125rem;
`;
const SyllableChunkTitle = styled.div`
  font-size: 1.15em;
  font-family: ${strings.css.googleFontFamily};
`;
const SyllableChunkElements = styled.div`

`;
const SyllableTypeElements = styled.div``;

const syllableTypes = ['coda', 'nucleus', 'onset'];

const SyllabificationBreakdown: React.FC<ISyllabificationDataProps> = ({ word, syllables }) => {
    function buildTypeElements(syllable: ISyllable, i: number) {
        const typeElements = [];

        for (const type of syllableTypes) {
            const syllableElements: string[] = syllable[type];

            if (!syllableElements.length) {
                continue;
            }

            typeElements.push(
                <SyllableTypeElements key={`syllable-${i}-${type}`}>
                    {syllableElements.length} {StringUtil.getPluralizedString('element', syllableElements.length)} in the {type}: {syllableElements.join(', ')}
                </SyllableTypeElements>
            );
        }

        return typeElements;
    }

    function buildSyllableElements() {
        return syllables.map((syllable, i) => (
             <SyllableInformationContainer key={`syllable-${i}`}>
                 <SyllableChunkTitle>
                     "{[...syllable.onset, ...syllable.nucleus, ...syllable.coda].join('')}" ({i + 1})
                 </SyllableChunkTitle>
                 <SyllableChunkElements>
                     {buildTypeElements(syllable, i)}
                 </SyllableChunkElements>
             </SyllableInformationContainer>
        ));
    }

    return (
        <Card
            title={`"${word}" has ${syllables.length} ${StringUtil.getPluralizedString('Syllable', syllables.length)}`}
            backgroundColor={'#214f90'}
        >
            <SyllabificationBreakdownContainer>
                {buildSyllableElements()}
            </SyllabificationBreakdownContainer>
        </Card>
    );
};

export default SyllabificationBreakdown;