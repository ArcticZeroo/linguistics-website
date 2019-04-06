enum TongueFrontBackness {
    front, central, back
}

enum TongueHeight {
    high, mid, low
}

interface IVowelData {
    frontBackness: TongueFrontBackness;
    height: TongueHeight;
    isRounded: boolean;
    isTense: boolean;
}

const vowels: { [symbol: string]: IVowelData } = {
    'i': {
        frontBackness: TongueFrontBackness.front,
        height: TongueHeight.high,
        isRounded: false,
        isTense: true
    },
    'y': {
        frontBackness: TongueFrontBackness.front,
        height: TongueHeight.high,
        isRounded: true,
        isTense: true
    },
    'I': {
        frontBackness: TongueFrontBackness.front,
        height: TongueHeight.high,
        isRounded: false,
        isTense: false
    },
    'ɛ': {
        frontBackness: TongueFrontBackness.front,
        height: TongueHeight.mid,
        isRounded: false,
        isTense: false
    },
    'æ': {
        frontBackness: TongueFrontBackness.front,
        height: TongueHeight.low,
        isRounded: false,
        isTense: false
    },
    'ɨ': {
        frontBackness: TongueFrontBackness.central,
        height: TongueHeight.high,
        isRounded: false,
        isTense: false
    },
    'ə': {
        frontBackness: TongueFrontBackness.central,
        height: TongueHeight.mid,
        isRounded: false,
        isTense: false
    },
    'a': {
        frontBackness: TongueFrontBackness.central,
        height: TongueHeight.low,
        isRounded: false,
        isTense: false
    },
    'u': {
        frontBackness: TongueFrontBackness.back,
        height: TongueHeight.high,
        isRounded: true,
        isTense: true
    },
    'ʊ': {
        frontBackness: TongueFrontBackness.back,
        height: TongueHeight.high,
        isRounded: true,
        isTense: false
    },
    'o': {
        frontBackness: TongueFrontBackness.back,
        height: TongueHeight.mid,
        isRounded: true,
        isTense: true
    },
    'ɔ': {
        frontBackness: TongueFrontBackness.back,
        height: TongueHeight.mid,
        isRounded: true,
        isTense: false
    },
    'ʌ': {
        frontBackness: TongueFrontBackness.back,
        height: TongueHeight.mid,
        isRounded: false,
        isTense: false
    },
    'ɑ': {
        frontBackness: TongueFrontBackness.back,
        height: TongueHeight.low,
        isRounded: false,
        isTense: false
    }
};

export default vowels;