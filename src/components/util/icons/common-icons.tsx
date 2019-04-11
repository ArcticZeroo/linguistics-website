import * as React from 'react';
import CircleMaterialIcon from './CircleMaterialIcon';

const YesCheckmark = () => (
    <CircleMaterialIcon
        icon="done"
        backgroundColor="#22c124"
    />
);

const NoX = () => (
    <CircleMaterialIcon
        icon="close"
        backgroundColor="#22c124"
    />
);

export { YesCheckmark, NoX };