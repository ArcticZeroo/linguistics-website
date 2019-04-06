import { useRef } from 'react';
import * as React from 'react';

const SelectOnClick: React.FC = ({ children }) => {
    const refObject = useRef<HTMLDivElement>(null);

    function onClick() {
        if (!refObject.current) {
            return;
        }

        const range = document.createRange();
        range.selectNode(refObject.current);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }

    return (
        <div ref={refObject} onClick={onClick}>
            {children}
        </div>
    );
};

export default SelectOnClick;