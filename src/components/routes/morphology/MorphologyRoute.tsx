import { useState } from 'react';
import * as React from 'react';
import styled from 'styled-components';
import { groupValues } from '../../../api/linguistics/morphology/dependency';
import DependencyResolver from '../../../api/linguistics/morphology/DependencyResolver';
import strings from '../../../config/strings';
import Card from '../../styled/card/Card';
import { ErrorCard } from '../../styled/card/colored-cards';
import FlatButton from '../../styled/FlatButton';
import FlexCenteredColumn from '../../styled/FlexCenteredColumn';
import DependencyResult from './DependencyResult';
import InputsTable, { createDefaultWordInputData, IInputState } from './input/InputsTable';

// dog
// my dog
// our dog
// dogs
const HorizontalInputContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MorphologyRoute = () => {
    const [inputState, setInputState] = useState<IInputState>({ currentId: 1, values: { 0: createDefaultWordInputData() } });
    const [outputState, setOutputState] = useState<IInputState>({ currentId: 1, values: { 0: createDefaultWordInputData() } });
    const [results, setResults] = useState();

    function onFormSubmit(event: React.FormEvent) {
        event.preventDefault();

        const groupedInputs = groupValues(Object.values(inputState.values));

        console.log('input state:', inputState);
        console.log('grouped inputs:', groupedInputs);

        const dependencyResolver = new DependencyResolver(groupedInputs);

        const outputResults = [];

        for (const desiredOutput of Object.values(outputState.values)) {
            let resolved;
            try {
                resolved = dependencyResolver.resolveDependencies(desiredOutput.translationData);
            } catch (e) {
                console.error(e);
                outputResults.push(
                    <ErrorCard title={`Unable to resolve "${desiredOutput.word}"`}>
                        Something went wrong when trying to resolve this.<br/>
                        Typically this means that there is not enough data.
                    </ErrorCard>
                );
                continue;
            }

            outputResults.push(
                <DependencyResult source={desiredOutput} resolvedDependencies={resolved}/>
            );
        }

        setResults(outputResults);
    }

    return (
        <FlexCenteredColumn>
            <form onSubmit={onFormSubmit}>
                <HorizontalInputContainer>
                    <Card title="Inputs">
                        <InputsTable
                            state={inputState}
                            setState={setInputState}
                            entryName={strings.morphology.inputs.inputsName}
                            canBaseBeDisabled={false}
                        />
                    </Card>
                    <Card title="Outputs">
                        <InputsTable
                            state={outputState}
                            setState={setOutputState}
                            entryName={strings.morphology.inputs.outputsName}
                            canBaseBeDisabled={true}
                        />
                    </Card>
                </HorizontalInputContainer>
                <SubmitButtonContainer>
                    <FlatButton type="submit">
                        Analyze
                    </FlatButton>
                </SubmitButtonContainer>
            </form>
            {results}
        </FlexCenteredColumn>
    );
};

export default MorphologyRoute;