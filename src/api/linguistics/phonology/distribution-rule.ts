import Optional from '../../../models/Optional';
import consonants, { isConsonant } from '../ipa/consonants';
import vowels, { isVowel, TongueHeight } from '../ipa/vowels';
import { EnvironmentMap, EnvironmentSymbolsDataMap, IEnvironmentData, wordBoundaryIdentifier } from './environment';

enum NaturalClassType {
    wordBoundary,
    vowel,
    consonant,
    consonantPlace,
    consonantManner,
    consonantVoicing,
    vowelHeight,
    vowelFrontBackness,
    vowelRounding,
    vowelTenseness
}

const naturalClassTests = {
    wordBoundary(map: EnvironmentMap) {
        const symbols = Object.keys(map);

        return symbols.length === 1 && symbols[0] === wordBoundaryIdentifier;
    },

    vowel(map: EnvironmentMap) {
        return Object.keys(map).every(isVowel);
    },

    consonant(map: EnvironmentMap) {
        return Object.keys(map).every(isConsonant);
    },

    isTypeWithSameProp<T>(map: EnvironmentMap, typePredicate: (s: string) => boolean, propGetter: (s: string) => T) {
        let last: Optional<T> = null;

        return Object.keys(map).every(s => {
            if (!typePredicate(s)) {
                return false;
            }

            if (last == null) {
                return true;
            }

            const prop = propGetter(s);

            if (last !== prop) {
                return false;
            }

            last = prop;

            return true;
        });
    },

    vowelWithSameHeight(map: EnvironmentMap) {
        return naturalClassTests.isTypeWithSameProp(map, isVowel, s => vowels[s].height);
    },

    vowelWithSameFrontBackness(map: EnvironmentMap) {
        return naturalClassTests.isTypeWithSameProp(map, isVowel, s => vowels[s].frontBackness);
    },

    consonantWithSamePlace(map: EnvironmentMap) {
        return naturalClassTests.isTypeWithSameProp(map, isConsonant, s => consonants[s].place);
    },

    consonantWithSameManner(map: EnvironmentMap) {
        return naturalClassTests.isTypeWithSameProp(map, isConsonant, s => consonants[s].manner);
    }
};

function isEveryEnvironmentWordBoundary(map: IEnvironmentData) {
    if (!map.leftToRight[wordBoundaryIdentifier] && !map.rightToLeft[wordBoundaryIdentifier]) {
        return false;
    }

    for (const leftSymbol of Object.keys(map.leftToRight)) {
        if (leftSymbol === wordBoundaryIdentifier) {
            continue;
        }

        if (!map.leftToRight[leftSymbol][wordBoundaryIdentifier]) {
            return false;
        }
    }

    return true;
}

function findDistributionRule(symbols: [string, string], map: EnvironmentSymbolsDataMap) {
    const [symbolA, symbolB] = symbols;


}