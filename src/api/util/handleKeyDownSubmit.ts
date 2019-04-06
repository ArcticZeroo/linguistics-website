import React from 'react';

export default function handleKeyDownSubmit(onSubmit: () => void) {
    return (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onSubmit();
        }
    }
}