import { MannerOfArticulation, PlaceOfArticulation, Voicing } from '../api/linguistics/ipa/consonants';
import { Rounding, Tenseness, TongueFrontBackness, TongueHeight } from '../api/linguistics/ipa/vowels';
export default {
    siteName: 'Test Title',
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
    }
}