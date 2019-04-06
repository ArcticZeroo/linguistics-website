import { useState } from 'react';
import * as React from 'react';
import styled from 'styled-components';
import { splitIpaIntoSymbols } from '../../../api/linguistics/ipa/consonants';
import FlatButton from '../../styled/FlatButton';
import PageTitle from '../../styled/PageTitle';
import StyledInput from '../../styled/StyledInput';

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

const SyllabificationRoute: React.FC = () => {
    const [inputValue, setInputValue] = useState('');

    return (
        <SyllabificationContainer>
            <PageTitle>
                IPA Syllabification
            </PageTitle>
            <InputBox>
                Input IPA Symbols:
                <StyledInput value={inputValue} onChange={e => setInputValue(e.target.value)}/>
            </InputBox>
            <InputBox>
                Identified symbols:
                <StyledInput readOnly={true} value={splitIpaIntoSymbols(inputValue)}/>
            </InputBox>
            <FlatButton onClick={() => console.log('Clicked')}>
                Submit
            </FlatButton>
        </SyllabificationContainer>
    );
};

export default SyllabificationRoute;