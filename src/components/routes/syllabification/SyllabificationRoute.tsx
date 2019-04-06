import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { areSyllablesValid, findSyllables, ISyllable } from '../../../api/linguistics/phonology/syllabification';
import handleKeyDownSubmit from '../../../api/util/handleKeyDownSubmit';
import Optional from '../../../models/Optional';
import Card from '../../styled/Card';
import ErrorCard from '../../styled/ErrorCard';
import FlatButton from '../../styled/FlatButton';
import PageTitle from '../../styled/PageTitle';
import StyledInput from '../../styled/StyledInput';
import SyllabificationData from './SyllabificationData';
import SyllabificationTree from './SyllabificationTree';

const SyllabificationContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ISyllabificationData {
    word: string;
    syllables: ISyllable[];
    isValid: boolean;
}

const SyllabificationRoute: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [syllabificationData, setSyllabificationData] = useState<Optional<ISyllabificationData>>();

    const syllabificationSettings = { maximumConsecutiveStops: 1 };

    function onButtonClick() {
        if (syllabificationData && syllabificationData.word === inputValue) {
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
        <SyllabificationContainer>
            <Card title="IPA Syllabification">
                <InputBox>
                    Input IPA Symbols:
                    <StyledInput value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDownSubmit(onButtonClick)}/>
                </InputBox>
                <FlatButton onClick={onButtonClick}>
                    Syllabify
                </FlatButton>
            </Card>
            { syllabificationData && (syllabificationData.isValid ? <SyllabificationData {...syllabificationData} /> : (
                <ErrorCard title="Invalid Input">
                    It appears that your input doesn't produce a valid syllabification.<br/>
                    Please check your input and try again.<br/>
                    You entered: {syllabificationData.word}
                </ErrorCard>
            )) }
        </SyllabificationContainer>
    );
};

export default SyllabificationRoute;