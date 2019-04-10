import { useState } from 'react';
import * as React from 'react';
import styled from 'styled-components';
import { createIpaSyllabification, ISyllable } from '../../../api/linguistics/phonology/syllabification';
import strings from '../../../config/strings';
import Card from '../../styled/card/Card';
import { ErrorCard } from '../../styled/card/colored-cards';
import FlatButton from '../../styled/FlatButton';
import FlexCenteredColumn from '../../styled/FlexCenteredColumn';
import StyledInput from '../../styled/StyledInput';

const RhymeForm = styled.form`
  display: flex;
  flex-direction: column;
`;

interface IRhymingData {
    wordOne: string;
    wordTwo: string;
    rhymeSyllableOne: ISyllable;
    rhymeSyllableTwo: ISyllable;
    doesRhyme: boolean;
}

interface IRhymeState {
    errorText?: string;
    rhymeData?: IRhymingData;
}

export default () => {
    const [wordOne, setWordOne] = useState('');
    const [wordTwo, setWordTwo] = useState('');
    const [{ errorText, rhymeData }, setRhymeState] = useState<IRhymeState>({});

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!wordOne.trim() || !wordTwo.trim()) {
            setRhymeState({ errorText: 'Words cannot be empty.' });
            return;
        }

        const syllablesOne = createIpaSyllabification(wordOne);
        const syllablesTwo = createIpaSyllabification(wordTwo);

        if (!syllablesOne.length || !syllablesTwo.length) {
            setRhymeState({ errorText: 'Both words must produce a valid syllabification.' });
        }

        const rhymeSyllableOne = syllablesOne[syllablesOne.length - 1];
        const rhymeSyllableTwo = syllablesTwo[syllablesTwo.length - 1];

        const doesRhyme = (
            rhymeSyllableOne.nucleus.join('') === rhymeSyllableTwo.nucleus.join('')
            && rhymeSyllableOne.coda.join('') === rhymeSyllableTwo.coda.join('')
        );

        setRhymeState({
            rhymeData: {
                wordOne,
                wordTwo,
                rhymeSyllableOne,
                rhymeSyllableTwo,
                doesRhyme
            }
        });
    }

    return (
        <FlexCenteredColumn>
            <Card title={strings.phonology.wordRhyme.title}>
                <RhymeForm onSubmit={onSubmit}>
                    {strings.phonology.wordRhyme.description}

                    <label>
                        {strings.phonology.wordRhyme.wordOne}
                    </label>

                    <StyledInput value={wordOne} onChange={e => setWordOne(e.target.value)} required={true} />

                    <label>
                        {strings.phonology.wordRhyme.wordTwo}
                    </label>

                    <StyledInput value={wordTwo} onChange={e => setWordTwo(e.target.value)} required={true} />

                    <FlatButton type="submit">
                        Check
                    </FlatButton>
                </RhymeForm>
            </Card>
            {errorText && (
                <ErrorCard title={strings.validation.invalidInput}>
                    {errorText}
                </ErrorCard>
            )}
            {rhymeData && (
                <Card>
                    Does rhyme: {rhymeData.doesRhyme ? 'yes' : 'no'}
                </Card>
            )}
        </FlexCenteredColumn>
    );
}