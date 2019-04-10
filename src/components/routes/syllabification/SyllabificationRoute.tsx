import * as React from 'react';
import FlexCenteredColumn from '../../styled/FlexCenteredColumn';
import SyllabifyWord from './SyllabifyWord';
import WordRhymeCheck from './WordRhymeCheck';

export default () => {
    return (
        <FlexCenteredColumn>
            <SyllabifyWord/>
            <WordRhymeCheck/>
        </FlexCenteredColumn>
    );
}