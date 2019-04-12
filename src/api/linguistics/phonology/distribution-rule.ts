import Optional from '../../../models/Optional';
import consonants, { isConsonant } from '../ipa/consonants';
import vowels, { isVowel } from '../ipa/vowels';
import {
    Distribution,
    EnvironmentMap,
    EnvironmentSymbolsDataMap,
    IDistributionData,
    IEnvironmentData,
    wordBoundaryIdentifier
} from './environment';

enum NaturalClassType {
    wordBoundary = 'boundary',
    vowel = 'vowel',
    consonant = 'consonant',
    consonantPlace = 'place',
    consonantManner = 'manner',
    consonantVoicing = 'voice',
    vowelHeight = 'height',
    vowelFrontBackness = 'frontback',
    vowelRounding = 'round',
    vowelTenseness = 'tense'
}

enum RelativePosition {
    left,
    right
}

function isTypeWithSameProp<T>(map: EnvironmentMap, typePredicate: (s: string) => boolean, propGetter: (s: string) => T): boolean {
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

    vowelWithSameHeight(map: EnvironmentMap) {
        return isTypeWithSameProp(map, isVowel, s => vowels[s].height);
    },

    vowelWithSameFrontBackness(map: EnvironmentMap) {
        return isTypeWithSameProp(map, isVowel, s => vowels[s].frontBackness);
    },

    consonantWithSamePlace(map: EnvironmentMap) {
        return isTypeWithSameProp(map, isConsonant, s => consonants[s].place);
    },

    consonantWithSameManner(map: EnvironmentMap) {
        return isTypeWithSameProp(map, isConsonant, s => consonants[s].manner);
    }
};

const testData: Array<[(map: EnvironmentMap) => boolean, NaturalClassType]> = [
    [naturalClassTests.wordBoundary, NaturalClassType.wordBoundary],
    [naturalClassTests.vowel, NaturalClassType.vowel],
    [naturalClassTests.consonant, NaturalClassType.consonant],
    [naturalClassTests.vowelWithSameHeight, NaturalClassType.vowelHeight],
    [naturalClassTests.vowelWithSameFrontBackness, NaturalClassType.vowelFrontBackness],
    [naturalClassTests.consonantWithSamePlace, NaturalClassType.consonantPlace],
    [naturalClassTests.consonantWithSameManner, NaturalClassType.consonantManner]
];

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

function findNaturalClass(data: EnvironmentMap): Optional<NaturalClassType> {
    const naturalClasses = [];

    for (const [testMethod, naturalClass] of testData) {
        if (testMethod(data)) {
            naturalClasses.push(naturalClass);
        }
    }

    console.log(naturalClasses);

    return null;
}

export function findDistributionRule(symbols: [string, string], map: EnvironmentSymbolsDataMap, distribution: IDistributionData) {
    const [symbolA, symbolB] = symbols;

    if (distribution.left === Distribution.complementary) {
        findNaturalClass(map[symbolA].leftToRight);
        findNaturalClass(map[symbolB].leftToRight);
    }

    if (distribution.right === Distribution.complementary) {
        findNaturalClass(map[symbolA].rightToLeft);
        findNaturalClass(map[symbolB].rightToLeft);
    }
}