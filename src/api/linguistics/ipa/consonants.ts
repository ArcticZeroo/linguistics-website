enum PlaceOfArticulation {
    bilabial,
    labiodental,
    interdental,
    alveolar,
    palatal,
    velar,
    glottal
}

enum MannerOfArticulation {
    stop,
    fricative,
    affricate,
    nasal,
    flap,
    retroflexLiquid,
    lateralLiquid,
    glide
}

enum Voicing {
    voiceless, voiced
}

interface IConsonantData {
    place: PlaceOfArticulation;
    manner: MannerOfArticulation;
    voicing: Voicing;
}

const placeOfArticulationOrder = [PlaceOfArticulation.bilabial, PlaceOfArticulation.labiodental, PlaceOfArticulation.interdental, PlaceOfArticulation.alveolar, PlaceOfArticulation.palatal, PlaceOfArticulation.velar, PlaceOfArticulation.glottal];
const mannerOfArticulationOrder = [MannerOfArticulation.stop, MannerOfArticulation.fricative, MannerOfArticulation.affricate, MannerOfArticulation.nasal, MannerOfArticulation.flap, MannerOfArticulation.retroflexLiquid, MannerOfArticulation.lateralLiquid, MannerOfArticulation.glide];
const voicingOrder = [Voicing.voiceless, Voicing.voiced];

const consonants: { [sound: string]: IConsonantData } = {
    'p': {
        place: PlaceOfArticulation.bilabial,
        manner: MannerOfArticulation.stop,
        voicing: Voicing.voiceless
    },
    'b': {
        place: PlaceOfArticulation.bilabial,
        manner: MannerOfArticulation.stop,
        voicing: Voicing.voiced
    },
    'w': {
        place: PlaceOfArticulation.bilabial,
        manner: MannerOfArticulation.glide,
        voicing: Voicing.voiced
    },
    'm': {
        place: PlaceOfArticulation.bilabial,
        manner: MannerOfArticulation.nasal,
        voicing: Voicing.voiced
    },
    'f': {
        place: PlaceOfArticulation.labiodental,
        manner: MannerOfArticulation.fricative,
        voicing: Voicing.voiceless
    },
    'v': {
        place: PlaceOfArticulation.labiodental,
        manner: MannerOfArticulation.fricative,
        voicing: Voicing.voiced
    },
    'θ': {
        place: PlaceOfArticulation.interdental,
        manner: MannerOfArticulation.fricative,
        voicing: Voicing.voiceless
    },
    'ð': {
        place: PlaceOfArticulation.interdental,
        manner: MannerOfArticulation.fricative,
        voicing: Voicing.voiced
    },
    't': {
        place: PlaceOfArticulation.alveolar,
        manner: MannerOfArticulation.stop,
        voicing: Voicing.voiceless
    },
    'd': {
        place: PlaceOfArticulation.alveolar,
        manner: MannerOfArticulation.stop,
        voicing: Voicing.voiced
    },
    's': {
        place: PlaceOfArticulation.alveolar,
        manner: MannerOfArticulation.fricative,
        voicing: Voicing.voiceless
    },
    'z': {
        place: PlaceOfArticulation.alveolar,
        manner: MannerOfArticulation.fricative,
        voicing: Voicing.voiced
    },
    'n': {
        place: PlaceOfArticulation.alveolar,
        manner: MannerOfArticulation.nasal,
        voicing: Voicing.voiced
    },
    'ɾ': {
        place: PlaceOfArticulation.alveolar,
        manner: MannerOfArticulation.flap,
        voicing: Voicing.voiced
    },
    'l': {
        place: PlaceOfArticulation.alveolar,
        manner: MannerOfArticulation.lateralLiquid,
        voicing: Voicing.voiced
    },
    'ɹ': {
        place: PlaceOfArticulation.alveolar,
        manner: MannerOfArticulation.retroflexLiquid,
        voicing: Voicing.voiced
    },
    'ʃ': {
        place: PlaceOfArticulation.palatal,
        manner: MannerOfArticulation.fricative,
        voicing: Voicing.voiceless
    },
    'ʒ': {
        place: PlaceOfArticulation.palatal,
        manner: MannerOfArticulation.fricative,
        voicing: Voicing.voiced
    },
    'tʃ': {
        place: PlaceOfArticulation.palatal,
        manner: MannerOfArticulation.affricate,
        voicing: Voicing.voiceless
    },
    'dʒ': {
        place: PlaceOfArticulation.palatal,
        manner: MannerOfArticulation.affricate,
        voicing: Voicing.voiced
    },
    'j': {
        place: PlaceOfArticulation.palatal,
        manner: MannerOfArticulation.glide,
        voicing: Voicing.voiced
    },
    'k': {
        place: PlaceOfArticulation.velar,
        manner: MannerOfArticulation.stop,
        voicing: Voicing.voiceless
    },
    'g': {
        place: PlaceOfArticulation.velar,
        manner: MannerOfArticulation.stop,
        voicing: Voicing.voiced
    },
    'ŋ': {
        place: PlaceOfArticulation.velar,
        manner: MannerOfArticulation.nasal,
        voicing: Voicing.voiced
    },
    'ɫ': {
        place: PlaceOfArticulation.velar,
        manner: MannerOfArticulation.lateralLiquid,
        voicing: Voicing.voiced
    },
    'ʔ': {
        place: PlaceOfArticulation.glottal,
        manner: MannerOfArticulation.stop,
        voicing: Voicing.voiceless
    },
    'h': {
        place: PlaceOfArticulation.glottal,
        manner: MannerOfArticulation.fricative,
        voicing: Voicing.voiceless
    }
};

function splitIpaIntoSymbols(source: string): string[] {
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

export {
    PlaceOfArticulation, MannerOfArticulation, Voicing,
    placeOfArticulationOrder, mannerOfArticulationOrder, voicingOrder,
    splitIpaIntoSymbols
};

export default consonants;