import * as React from 'react';
import Optional from '../../models/Optional';

function clearContents(element: HTMLElement) {
    while (element.lastChild) {
        element.removeChild(element.lastChild);
    }
}

export default function useCanvas(onCanvasCreate: (canvas: HTMLCanvasElement) => void, divProps: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> = {}) {
    function onRefUpdate(div: Optional<HTMLDivElement>) {
        if (!div) {
            return;
        }

        clearContents(div);

        const canvas = document.createElement('canvas');

        onCanvasCreate(canvas);

        div.appendChild(canvas);
    }

    return (
        <div {...divProps} ref={onRefUpdate} />
    );
}