import { useState } from 'react';
import * as React from 'react';
import styled from 'styled-components';
import {
    areSyllablesValid,
    createIpaSyllabification,
    ISyllable,
    syllableToString
} from '../../../api/linguistics/phonology/syllabification';
import strings from '../../../config/strings';
import Card from '../../styled/card/Card';
import { ErrorCard } from '../../styled/card/colored-cards';
import FlatButton from '../../styled/FlatButton';
import FlexCenteredColumn from '../../styled/FlexCenteredColumn';
import StyledInput from '../../styled/StyledInput';
import { NoX, YesCheckmark } from '../../util/icons/common-icons';

const RhymeForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const RhymeResultsRow = styled.div`
  display: flex;
  align-items: center;
`;

const RhymeResultText = styled.span`
  margin-left: 1rem;
`;

const RhymeInputContainer = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
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

        console.log(syllablesOne, syllablesTwo);

        if (!areSyllablesValid(syllablesOne) || !areSyllablesValid(syllablesTwo)) {
            setRhymeState({ errorText: 'Both words must produce a valid syllabification.' });
            return;
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

                    <RhymeInputContainer>
                        <label>
                            {strings.phonology.wordRhyme.wordOne}
                        </label>

                        <StyledInput value={wordOne} onChange={e => setWordOne(e.target.value)} required={true} />
                    </RhymeInputContainer>

                    <RhymeInputContainer>
                        <label>
                            {strings.phonology.wordRhyme.wordTwo}
                        </label>

                        <StyledInput value={wordTwo} onChange={e => setWordTwo(e.target.value)} required={true} />
                    </RhymeInputContainer>

                    <FlatButton type="submit">
                        Check Rhyming
                    </FlatButton>
                </RhymeForm>
            </Card>
            {errorText && (
                <ErrorCard title={strings.validation.invalidInput}>
                    {errorText}
                </ErrorCard>
            )}
            {rhymeData && (
                <Card title={strings.phonology.wordRhyme.resultsTitle}>
                    <RhymeResultsRow>
                        {
                            rhymeData.doesRhyme ? (
                                <YesCheckmark/>
                            ) : (
                                <NoX/>
                            )
                        }
                        <RhymeResultText>
                            {
                                rhymeData.doesRhyme ? strings.phonology.wordRhyme.result.yes : strings.phonology.wordRhyme.result.no
                            }
                        </RhymeResultText>
                    </RhymeResultsRow>

                    <p>
                        The last syllable for "{rhymeData.wordOne}" is "{syllableToString(rhymeData.rhymeSyllableOne)}"
                    </p>

                    <p>
                        The last syllable for "{rhymeData.wordTwo}" is "{syllableToString(rhymeData.rhymeSyllableTwo)}"
                    </p>

                    <p>
                        {
                            rhymeData.doesRhyme ? (
                                <>
                                    Their nuclei ("{rhymeData.rhymeSyllableOne.nucleus.join('')}") and coda ("{rhymeData.rhymeSyllableOne.coda.join('')}") match.
                                </>
                            ) : (
                                <>
                                    Their nuclei and coda do not match.
                                </>
                            )
                        }
                    </p>
                </Card>
            )}
        </FlexCenteredColumn>
    );
}