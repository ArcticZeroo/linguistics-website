import { useState } from 'react';
import * as React from 'react';
import styled from 'styled-components';
import translate from '../../../api/linguistics/morphology/translation';
import strings from '../../../config/strings';
import Card from '../../styled/card/Card';
import FlatButton from '../../styled/FlatButton';
import FlexCenteredColumn from '../../styled/FlexCenteredColumn';
import InputsTable, { createDefaultWordInputData, IInputState } from './input/InputsTable';

// dog
// my dog
// our dog
// dogs
const SubmitButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MorphologyRoute = () => {
    const [inputState, setInputState] = useState<IInputState>({ currentId: 1, values: { 0: createDefaultWordInputData() } });
    const [outputState, setOutputState] = useState<IInputState>({ currentId: 1, values: { 0: createDefaultWordInputData() } });

    function onFormSubmit(event: React.FormEvent) {
        event.preventDefault();

        translate(inputState, outputState);
    }

    return (
        <FlexCenteredColumn>
            <form onSubmit={onFormSubmit}>
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
                <SubmitButtonContainer>
                    <FlatButton type="submit">
                        Analyze
                    </FlatButton>
                </SubmitButtonContainer>
            </form>
        </FlexCenteredColumn>
    );
};

export default MorphologyRoute;