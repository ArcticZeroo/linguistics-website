import * as React from 'react';
import strings from '../../../config/strings';
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

const Delete = () => (
    <CircleMaterialIcon
        icon="delete"
        backgroundColor={strings.colors.brightRed}
    />
);

export { YesCheckmark, NoX, Delete };