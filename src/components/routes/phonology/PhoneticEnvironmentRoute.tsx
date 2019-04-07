import { useState } from 'react';
import * as React from 'react';
import styled from 'styled-components';
import { isKnownIpaSymbol, splitIpaIntoSymbols } from '../../../api/linguistics/ipa/util';
import strings from '../../../config/strings';
import Optional from '../../../models/Optional';
import InfiniteInputs, { IInputData } from '../../input/infinite/InfiniteInputs';
import Card from '../../styled/Card';
import ErrorCard from '../../styled/ErrorCard';
import FlatButton from '../../styled/FlatButton';
import FlexCenteredColumn from '../../styled/FlexCenteredColumn';
import StyledInput, { maxWidthStyle } from '../../styled/StyledInput';

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  flex-direction: column;
  flex-grow: 0;
  align-items: flex-start;
`;

function splitSymbols(source: string) {
    const split = source.split(/([,]\s+|[,]|\s+)/);

    const symbols: Set<string> = new Set();

    for (const item of split) {
        if (isKnownIpaSymbol(item)) {
            symbols.add(item);
            continue;
        }

        // Don't bother trying to split and search for symbols within,
        // if it's already the smallest unit we can muster.
        if (item.length === 1) {
            continue;
        }

        // If the symbol is not known
        const knownSymbolsByChar = splitIpaIntoSymbols(item).filter(isKnownIpaSymbol);

        for (const symbol of knownSymbolsByChar) {
            symbols.add(symbol);
        }
    }

    return symbols;
}

function getValidationError(data: Optional<IEnvironmentData>): Optional<string> {
    if (!data) {
        return null;
    }

    const { sources, symbols } = data;

    if (symbols.length === 0) {
        return strings.phoneticEnvironment.noSymbols;
    }

    if (sources.length === 0 || !sources.every(s => !!s.trim())) {
        return strings.phoneticEnvironment.emptyString;
    }
}

interface IEnvironmentData {
    sources: string[];
    symbols: string[];
}

const PhoneticEnvironmentRoute: React.FC = () => {
    const [inputData, setInputData] = useState<IInputData>({ currentId: 1, values: { 0: '' } });
    const [symbolValue, setSymbolValue] = useState('');
    const [environmentData, setEnvironmentData] = useState<Optional<IEnvironmentData>>(null);

    function onAnalyzeButtonPress() {
        const sources: string[] = Array.from(new Set(Object.values(inputData.values)));
        const symbols = Array.from(splitSymbols(symbolValue));

        setEnvironmentData({
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

    const validationError = getValidationError(environmentData);

    return (
        <FlexCenteredColumn>
            <Card title={'Phonetic Environment'}>
                <InputContainer>
                    Words to find the phonetic environment in:
                    <InfiniteInputs addButtonText={'Add Word'}
                                    onDataChange={setInputData}
                                    inputData={inputData}
                                    onInputKeyDown={onInputKeyDown}
                    />
                </InputContainer>

                <InputContainer>
                    Symbols to search for (separate by commas or spaces)
                    <StyledInput style={maxWidthStyle}
                                 onChange={e => setSymbolValue(e.target.value)}
                                 value={symbolValue}
                                 onKeyDown={onInputKeyDown}
                    />
                </InputContainer>

                <FlatButton onClick={onAnalyzeButtonPress}>
                    Analyze Environment
                </FlatButton>
            </Card>
            {
                validationError && (
                    <ErrorCard title={strings.validation.invalidInput}>
                        {validationError}
                    </ErrorCard>
                )
            }
        </FlexCenteredColumn>
    );
};

export default PhoneticEnvironmentRoute;