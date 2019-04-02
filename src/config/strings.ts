import { MannerOfArticulation, PlaceOfArticulation, Voicing } from '../api/linguistics/ipa/consonants';
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
    ipaChart: {
        yAxisLabel: 'Manner of Articulation',
        xAxisLabel: 'Place of Articulation'
    }
}