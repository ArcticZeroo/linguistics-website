enum Theme {
    dark, light
}

export function getForegroundTheme(backgroundColor: string): Theme {
    if (backgroundColor.startsWith('#')) {
        const hex = backgroundColor.substr(1);

        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);

        const average = (r + g + b) / 3;

        return average >= (255 / 2) ? Theme.dark : Theme.light;
    }

    return Theme.dark;
}

export function getForegroundColor(backgroundColor: string): string {
    return getForegroundTheme(backgroundColor) === Theme.dark ? '#212121' : '#FAFAFA';
}