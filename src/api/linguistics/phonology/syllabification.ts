import consonants, { MannerOfArticulation } from '../ipa/consonants';
import { normalizeSymbols, splitIpaIntoSymbols } from '../ipa/util';
import vowels from '../ipa/vowels';

interface ISyllabificationOptions {
    maximumConsecutiveStops: number;
}

export interface ISyllable {
    onset: string[];
    nucleus: string[];
    coda: string[];
}

enum CreationState {
    coda = 'coda',
    onset = 'onset'
}

const sonorities = {
    [MannerOfArticulation.stop]: 0,
    [MannerOfArticulation.fricative]: 1,
    [MannerOfArticulation.affricate]: 2,
    [MannerOfArticulation.nasal]: 3,
    [MannerOfArticulation.flap]: 4,
    [MannerOfArticulation.lateralLiquid]: 5,
    [MannerOfArticulation.retroflexLiquid]: 5,
    [MannerOfArticulation.glide]: 6
};

const isVowel = (s: string) => vowels.hasOwnProperty(s);
const isConsonant = (s: string) => consonants.hasOwnProperty(s);

const getDefaultSyllable = (): ISyllable => ({ onset: [], coda: [], nucleus: [] });

const getLastSyllable = <T>(syllables: T[], n: number = 1) => syllables[syllables.length - n];

const getSonority = (s: string) => isConsonant(s) ? sonorities[consonants[s].manner] : 0;

export function findSyllables(input: string | string[], options: ISyllabificationOptions) {
    if (typeof input === 'string') {
        input = splitIpaIntoSymbols(normalizeSymbols(input));
    }

    const syllables: ISyllable[] = [getDefaultSyllable()];
    let state = CreationState.coda;
    let lastSymbol = null;

    for (let i = input.length - 1; i >= 0; --i) {
        const current = input[i];
        const lastSyllable = getLastSyllable(syllables);

        console.log('Checking letter', current, 'at', i);
        console.log('My current state is', state);

        if (state === CreationState.coda) {
            if (isVowel(current)) {
                console.log('hit a vowel in the coda state, starting onset');
                lastSyllable.nucleus.push(current);
                state = CreationState.onset;
            } else {
                console.log('hit a consonant in the coda state');
                lastSyllable.coda.push(current);
            }
        } else {
            if (isVowel(current)) {
                console.log('hit a vowel in the onset state...');
                if (!lastSymbol || isVowel(lastSymbol)) {
                    console.log('last was a vowel, will continue adding to nucleus');
                    lastSyllable.nucleus.push(current);
                } else {
                    console.log('vowel appeared unexpectedly, will create new syllable for it');
                    const nextSyllable = getDefaultSyllable();
                    nextSyllable.nucleus.push(current);
                    syllables.push(nextSyllable);
                    state = CreationState.onset;
                }
            } else {
                if (!lastSymbol || isVowel(lastSymbol) || getSonority(lastSymbol) > getSonority(current)) {
                    console.log('hit consonant with valid sonority order, continuing onset');
                    lastSyllable.onset.push(current);
                } else {
                    console.log('this consonant has invalid sonority, creating new syllable and entering coda phase');
                    const nextSyllable = getDefaultSyllable();
                    nextSyllable.coda.push(current);
                    syllables.push(nextSyllable);
                    state = CreationState.coda;
                }
            }
        }

        lastSymbol = current;
    }

    // Sometimes the first syllable has no nucleus, so we pair it up with the next one
    if (syllables.length >= 2 && !getLastSyllable(syllables).nucleus.length) {
        const toMerge = getLastSyllable(syllables);
        const source = getLastSyllable(syllables, 2);

        source.onset.push(...toMerge.onset);
        source.onset.push(...toMerge.coda);

        syllables.pop();
    }

    for (const syllable of syllables) {
        syllable.coda = syllable.coda.reverse();
        syllable.onset = syllable.onset.reverse();
        syllable.nucleus = syllable.nucleus.reverse();
    }

    return syllables.reverse();
}