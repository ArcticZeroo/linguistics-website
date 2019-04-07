enum TongueFrontBackness {
    front, central, back
}

enum TongueHeight {
    high, mid, low
}

enum Rounding {
    rounded,
    unrounded
}

enum Tenseness {
    tense,
    lax
}

interface IVowelData {
    frontBackness: TongueFrontBackness;
    height: TongueHeight;
    rounding: Rounding;
    tenseness: Tenseness;
}

const vowels: { [symbol: string]: IVowelData } = {
    'i': {
        frontBackness: TongueFrontBackness.front,
        height: TongueHeight.high,
        rounding: Rounding.unrounded,
        tenseness: Tenseness.tense
    },
    'y': {
        frontBackness: TongueFrontBackness.front,
        height: TongueHeight.high,
        rounding: Rounding.rounded,
        tenseness: Tenseness.tense
    },
    'I': {
        frontBackness: TongueFrontBackness.front,
        height: TongueHeight.high,
        rounding: Rounding.unrounded,
        tenseness: Tenseness.lax
    },
    'e': {
        frontBackness: TongueFrontBackness.front,
        height: TongueHeight.mid,
        rounding: Rounding.unrounded,
        tenseness: Tenseness.tense
    },
    'ɛ': {
        frontBackness: TongueFrontBackness.front,
        height: TongueHeight.mid,
        rounding: Rounding.unrounded,
        tenseness: Tenseness.lax
    },
    'æ': {
        frontBackness: TongueFrontBackness.front,
        height: TongueHeight.low,
        rounding: Rounding.unrounded,
        tenseness: Tenseness.lax
    },
    'ɨ': {
        frontBackness: TongueFrontBackness.central,
        height: TongueHeight.high,
        rounding: Rounding.unrounded,
        tenseness: Tenseness.lax
    },
    'ə': {
        frontBackness: TongueFrontBackness.central,
        height: TongueHeight.mid,
        rounding: Rounding.unrounded,
        tenseness: Tenseness.lax
    },
    'a': {
        frontBackness: TongueFrontBackness.central,
        height: TongueHeight.low,
        rounding: Rounding.unrounded,
        tenseness: Tenseness.lax
    },
    'u': {
        frontBackness: TongueFrontBackness.back,
        height: TongueHeight.high,
        rounding: Rounding.rounded,
        tenseness: Tenseness.tense
    },
    'ʊ': {
        frontBackness: TongueFrontBackness.back,
        height: TongueHeight.high,
        rounding: Rounding.rounded,
        tenseness: Tenseness.lax
    },
    'o': {
        frontBackness: TongueFrontBackness.back,
        height: TongueHeight.mid,
        rounding: Rounding.rounded,
        tenseness: Tenseness.tense
    },
    'ɔ': {
        frontBackness: TongueFrontBackness.back,
        height: TongueHeight.mid,
        rounding: Rounding.rounded,
        tenseness: Tenseness.lax
    },
    'ʌ': {
        frontBackness: TongueFrontBackness.back,
        height: TongueHeight.mid,
        rounding: Rounding.unrounded,
        tenseness: Tenseness.lax
    },
    'ɑ': {
        frontBackness: TongueFrontBackness.back,
        height: TongueHeight.low,
        rounding: Rounding.unrounded,
        tenseness: Tenseness.lax
    }
};

export { TongueFrontBackness, TongueHeight, Tenseness, Rounding };
export default vowels;