import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { findSyllables, ISyllable } from '../../../api/linguistics/phonology/syllabification';
import handleKeyDownSubmit from '../../../api/util/handleKeyDownSubmit';
import Optional from '../../../models/Optional';
import FlatButton from '../../styled/FlatButton';
import PageTitle from '../../styled/PageTitle';
import StyledInput from '../../styled/StyledInput';
import SyllablesDisplay from './SyllablesDisplay';

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
}

const SyllabificationRoute: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [syllabificationData, setSyllabificationData] = useState<Optional<ISyllabificationData>>();
    const syllabificationSettings = { maximumConsecutiveStops: 1 };

    function onButtonClick() {
        if (syllabificationData && syllabificationData.word === inputValue) {
            return;
        }

        setSyllabificationData({
            syllables: findSyllables(inputValue, syllabificationSettings),
            word: inputValue
        });
    }

    return (
        <SyllabificationContainer>
            <PageTitle>
                IPA Syllabification
            </PageTitle>
            <InputBox>
                Input IPA Symbols:
                <StyledInput value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDownSubmit(onButtonClick)}/>
            </InputBox>
            <FlatButton onClick={onButtonClick}>
                Syllabify
            </FlatButton>
            { syllabificationData && <SyllablesDisplay {...syllabificationData} /> }
        </SyllabificationContainer>
    );
};

export default SyllabificationRoute;