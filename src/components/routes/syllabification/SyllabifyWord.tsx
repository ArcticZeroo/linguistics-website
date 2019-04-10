import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { areSyllablesValid, findSyllables, ISyllable } from '../../../api/linguistics/phonology/syllabification';
import handleKeyDownSubmit from '../../../api/util/handleKeyDownSubmit';
import strings from '../../../config/strings';
import Optional from '../../../models/Optional';
import Card from '../../styled/Card';
import ErrorCard from '../../styled/ErrorCard';
import FlatButton from '../../styled/FlatButton';
import FlexCenteredColumn from '../../styled/FlexCenteredColumn';
import PageTitle from '../../styled/PageTitle';
import StyledInput from '../../styled/StyledInput';
import SyllabificationData from './SyllabificationData';
import SyllabificationTree from './SyllabificationTree';

const CardInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const InputLabel = styled.label`
  font-family: ${strings.css.googleFontFamily};
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
`;

interface ISyllabificationData {
    word: string;
    syllables: ISyllable[];
    isValid: boolean;
}

const SyllabifyWord: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [syllabificationData, setSyllabificationData] = useState<Optional<ISyllabificationData>>();

    const syllabificationSettings = { maximumConsecutiveStops: 1 };

    function onButtonClick() {
        if (!inputValue.trim() || syllabificationData && syllabificationData.word === inputValue) {
            return;
        }

        const syllables = findSyllables(inputValue, syllabificationSettings);

        setSyllabificationData({
            syllables,
            word: inputValue,
            isValid: areSyllablesValid(syllables)
        });
    }

    return (
        <FlexCenteredColumn>
            <Card title="IPA Syllabification">
                <CardInfoContainer>
                    <InputLabel>
                        Input IPA Symbols
                    </InputLabel>
                    <StyledInput
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDownSubmit(onButtonClick)}
                        required={true}
                    />
                </CardInfoContainer>
                <ButtonContainer>
                    <FlatButton onClick={onButtonClick}>
                        Syllabify
                    </FlatButton>
                </ButtonContainer>
            </Card>
            {syllabificationData && (syllabificationData.isValid ? <SyllabificationData {...syllabificationData} /> : (
                <ErrorCard title="Invalid Input">
                    It appears that your input doesn't produce a valid syllabification.<br/>
                    Please check your input and try again.<br/>
                    You entered: {syllabificationData.word}
                </ErrorCard>
            ))}
        </FlexCenteredColumn>
    );
};

export default SyllabifyWord;