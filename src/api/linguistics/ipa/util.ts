import consonants from './consonants';

export function splitIpaIntoSymbols(source: string): string[] {
    const symbols = [];

    for (let i = 0; i < source.length; ++i) {
        const current = source[i];

        if (i < source.length - 1) {
            const nextTwo = current + source[i + 1];

            if (consonants.hasOwnProperty(nextTwo)) {
                symbols.push(nextTwo);
                i++;
                continue;
            }
        }

        symbols.push(current);
    }

    return symbols;
}

export function normalizeSymbols(source: string): string {
    return source.replace(/[r]/g, 'ɹ');
}