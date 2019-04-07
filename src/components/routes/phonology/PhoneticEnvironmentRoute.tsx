import { useState } from 'react';
import * as React from 'react';
import InfiniteInputs from '../../input/infinite/InfiniteInputs';
import Card from '../../styled/Card';
import AddButton from '../../styled/AddButton';
import FlatButton from '../../styled/FlatButton';

const PhoneticEnvironmentRoute: React.FC = () => {
    const [inputValues, setInputValues] = useState({});
    const [symbolValues, setSymbolValues] = useState({});

    return (
        <Card title={'Phonetic Environment'}>
            Words to find the phonetic environment in:
            <InfiniteInputs addButtonText={'Add Word'} onValuesChange={setInputValues} />

            <br/>

            Symbols to search for in those words:
            <InfiniteInputs addButtonText={'Add Symbol(s)'} onValuesChange={setSymbolValues} />

            <FlatButton>
                Analyze Environment
            </FlatButton>
        </Card>
    );
};

export default PhoneticEnvironmentRoute;