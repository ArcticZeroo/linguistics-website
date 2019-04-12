import { useState } from 'react';
import * as React from 'react';
import styled from 'styled-components';
import { isKnownIpaSymbol, splitIpaIntoSymbols } from '../../../api/linguistics/ipa/util';
import { IEnvironmentParams } from '../../../api/linguistics/phonology/environment';
import strings from '../../../config/strings';
import Optional from '../../../models/Optional';
import InfiniteInputs, { IInputData } from '../../input/infinite/InfiniteInputs';
import Card from '../../styled/card/Card';
import { ErrorCard } from '../../styled/card/colored-cards';
import FlatButton from '../../styled/FlatButton';
import FlexCenteredColumn from '../../styled/FlexCenteredColumn';
import StyledInput, { maxWidthStyle } from '../../styled/StyledInput';
import PhoneticEnvironmentData from './PhoneticEnvironmentData';

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  flex-direction: column;
  flex-grow: 0;
  align-items: flex-start;
`;

function splitSymbols(source: string) {
    return new Set(source.split(/[,\s]+/));
}

function getValidationError(data: Optional<IEnvironmentParams>): Optional<string> {
    if (!data) {
        return null;
    }

    const { sources, symbols } = data;

    if (symbols.length === 0) {
        return strings.phoneticEnvironment.noSymbols;
    }

    if (sources.length === 0) {
        return strings.phoneticEnvironment.emptyString;
    }
}

const PhoneticEnvironmentRoute: React.FC = () => {
    const [inputData, setInputData] = useState<IInputData>({ currentId: 1, values: { 0: '' } });
    const [symbolValue, setSymbolValue] = useState('');
    const [environmentParams, setEnvironmentParams] = useState<Optional<IEnvironmentParams>>(null);

    function onAnalyzeButtonPress() {
        const sources: string[] = Array.from(new Set(Object.values(inputData.values))).filter(str => !!str.trim());
        const symbols = Array.from(splitSymbols(symbolValue));

        setEnvironmentParams({
            sources,
            symbols
        });
    }

    function onInputKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Enter') {
            event.preventDefault();
            onAnalyzeButtonPress();
        }
    }

    const validationError = getValidationError(environmentParams);

    return (
        <FlexCenteredColumn>
            <Card title={strings.phoneticEnvironment.title}>
                <InputContainer>
                    <label>
                        {strings.phoneticEnvironment.wordsLabel}
                    </label>
                    <InfiniteInputs addButtonText={'Add Word'}
                                    onDataChange={setInputData}
                                    inputData={inputData}
                                    onInputKeyDown={onInputKeyDown}
                    />
                </InputContainer>

                <InputContainer>
                    <label>
                        {strings.phoneticEnvironment.symbolsLabel}
                    </label>
                    <StyledInput style={maxWidthStyle}
                                 onChange={e => setSymbolValue(e.target.value)}
                                 value={symbolValue}
                                 onKeyDown={onInputKeyDown}
                    />
                </InputContainer>

                <FlatButton onClick={onAnalyzeButtonPress}>
                    {strings.phoneticEnvironment.analyzeButtonText}
                </FlatButton>
            </Card>
            {
                validationError && (
                    <ErrorCard title={strings.validation.invalidInput}>
                        {validationError}
                    </ErrorCard>
                )
            }
            {
                !validationError && environmentParams && <PhoneticEnvironmentData environmentParams={environmentParams} />
            }
        </FlexCenteredColumn>
    );
};

export default PhoneticEnvironmentRoute;