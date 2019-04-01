import { MannerOfArticulation, PlaceOfArticulation } from '../api/linguistics/ipa/consonants';
export default {
    siteName: 'Linguistics Website',
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
    ipaChart: {
        yAxisLabel: 'Manner of Articulation',
        xAxisLabel: 'Place of Articulation'
    }
}