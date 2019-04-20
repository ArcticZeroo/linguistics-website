import { useState } from 'react';
import * as React from 'react';
import styled from 'styled-components';
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

    function onFormSubmit() {

    }

    return (
        <FlexCenteredColumn>
            <form>
                <Card title="Inputs">
                    <InputsTable state={inputState} setState={setInputState}/>
                </Card>
                <Card title="Outputs">
                    test
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