import { MannerOfArticulation, PlaceOfArticulation, Voicing } from '../api/linguistics/ipa/consonants';
import { Rounding, Tenseness, TongueFrontBackness, TongueHeight } from '../api/linguistics/ipa/vowels';
import { Distribution } from '../api/linguistics/phonology/environment';

export default {
    siteName: 'Linguistic Analysis',
    placesOfArticulation: {
        [PlaceOfArticulation.bilabial]: 'Bilabial',
        [PlaceOfArticulation.labiodental]: 'Labio-Dental',
        [PlaceOfArticulation.interdental]: 'Inter-Dental',
        [PlaceOfArticulation.alveolar]: 'Alveolar',
        [PlaceOfArticulation.palatal]: 'Palatal',
        [PlaceOfArticulation.velar]: 'Velar',
        [PlaceOfArticulation.glottal]: 'Glottal'
    },
    mannerOfArticulation: {
        [MannerOfArticulation.stop]: 'Stop',
        [MannerOfArticulation.fricative]: 'Fricative',
        [MannerOfArticulation.affricate]: 'Affricate',
        [MannerOfArticulation.nasal]: 'Nasal',
        [MannerOfArticulation.flap]: 'Flap',
        [MannerOfArticulation.lateralLiquid]: 'Lateral Liquid',
        [MannerOfArticulation.retroflexLiquid]: 'Retroflex Liquid',
        [MannerOfArticulation.glide]: 'Glide'
    },
    voicing: {
        [Voicing.voiceless]: 'Voiceless',
        [Voicing.voiced]: 'Voiced'
    },
    css: {
        googleFontFamily: '"Google Sans", "Product Sans", "Roboto", sans-serif'
    },
    tongueFrontBackness: {
        [TongueFrontBackness.front]: 'Front',
        [TongueFrontBackness.central]: 'Central',
        [TongueFrontBackness.back]: 'Back'
    },
    tongueHeight: {
        [TongueHeight.high]: 'High',
        [TongueHeight.mid]: 'Mid',
        [TongueHeight.low]: 'Low'
    },
    rounding: {
        [Rounding.rounded]: 'Rounded',
        [Rounding.unrounded]: 'Unrounded'
    },
    tenseness: {
        [Tenseness.tense]: 'Tense',
        [Tenseness.lax]: 'Lax'
    },
    vowelChart: {
        vowelTitle: 'Vowel'
    },
    ipaCharts: {
        title: 'IPA Charts (Click sounds to select)'
    },
    phoneticEnvironment: {
        title: 'Phonetic Environment Analysis',
        wordsLabel: 'Enter words (as IPA symbols) to search in',
        symbolsLabel: 'Enter IPA symbols to search for (separate by commas or spaces)',
        analyzeButtonText: 'Analyze Environment',
        noSymbols: 'No valid symbols were found in your input.',
        emptyString: 'All of your inputs appear to be empty.',
        tables: {
            title: 'Environment Tables'
        },
        distributionRule: {
            invalidSymbolsTitle: 'Invalid Number of Symbols',
            invalidSymbolsBody: 'Distribution rules are only supported with 2 symbols.'
        }
    },
    validation: {
        invalidInput: 'Invalid Input'
    },
    distribution: {
        [Distribution.overlapping]: 'Overlapping',
        [Distribution.complementary]: 'Complementary'
    },
    phonology: {
        wordRhyme: {
            title: 'Word Rhyming',
            description: 'Enter two words, and see if they rhyme.',
            wordOne: 'First Word (IPA Symbols)',
            wordTwo: 'Second Word (IPA Symbols)',
            resultsTitle: 'Word Rhyming Results',
            result: {
                yes: 'These words rhyme!',
                no: 'These words do not rhyme.'
            }
        }
    }
}