import * as React from 'react';
import CircleMaterialIcon from './CircleMaterialIcon';

const YesCheckmark = () => (
    <CircleMaterialIcon
        icon="done"
        backgroundColor="#167a1d"
    />
);

const NoX = () => (
    <CircleMaterialIcon
        icon="close"
        backgroundColor="#851a1a"
    />
);

export { YesCheckmark, NoX };