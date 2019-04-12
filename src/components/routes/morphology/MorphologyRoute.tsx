import { useState } from 'react';
import * as React from 'react';
import Card from '../../styled/card/Card';
import FlexCenteredColumn from '../../styled/FlexCenteredColumn';
import InputsTable, { createDefaultWordInputData, IInputState } from './input/InputsTable';

// dog
// my dog
// our dog
// dogs

const MorphologyRoute = () => {
    const [inputState, setInputState] = useState<IInputState>({ currentId: 1, values: { 0: createDefaultWordInputData() } });

    return (
        <FlexCenteredColumn>
            <Card title="Morphology">
                <InputsTable state={inputState} setState={setInputState}/>
            </Card>
        </FlexCenteredColumn>
    );
};

export default MorphologyRoute;