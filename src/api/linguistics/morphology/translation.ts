import { IInputState, IWordInputData } from '../../../components/routes/morphology/input/InputsTable';
import { TranslationDataType } from '../../../components/routes/morphology/TranslationSettings';
import { groupValues } from './dependency';
import DependencyResolver from './DependencyResolver';

const dogData = {
    myDog: {
        word: 'mydog',
        translationData: {
            isEnabled: {
                [TranslationDataType.root]: true,
                [TranslationDataType.determiner]: true
            },
            values: {
                [TranslationDataType.root]: 'dog',
                [TranslationDataType.determiner]: 'my'
            }
        }
    },
    ourDog: {
        word: 'ourdog',
        translationData: {
            isEnabled: {
                [TranslationDataType.root]: true,
                [TranslationDataType.determiner]: true
            },
            values: {
                [TranslationDataType.root]: 'dog',
                [TranslationDataType.determiner]: 'our'
            }
        }
    },
    bigDog: {
        word: 'bigdog',
        translationData: {
            isEnabled: {
                [TranslationDataType.root]: true,
                [TranslationDataType.adjective]: true
            },
            values: {
                [TranslationDataType.root]: 'dog',
                [TranslationDataType.adjective]: 'big'
            }
        }
    },
    /*bigCat: {
        word: 'bigcat',
        translationData: {
            isEnabled: {
                [TranslationDataType.root]: true,
                [TranslationDataType.adjective]: true
            },
            values: {
                [TranslationDataType.root]: 'cat',
                [TranslationDataType.adjective]: 'big'
            }
        }
    },*/
    theCats: {
        word: 'thecatzz',
        translationData: {
            isEnabled: {
                [TranslationDataType.root]: true,
                [TranslationDataType.plural]: true,
                [TranslationDataType.determiner]: true
            },
            values: {
                [TranslationDataType.root]: 'cat',
                [TranslationDataType.plural]: 'true',
                [TranslationDataType.determiner]: 'the'
            }
        }
    },
    cats: {
        word: 'catzz',
        translationData: {
            isEnabled: {
                [TranslationDataType.root]: true,
                [TranslationDataType.plural]: true
            },
            values: {
                [TranslationDataType.root]: 'cat',
                [TranslationDataType.plural]: 'true'
            }
        }
    },
    dogs: {
        word: 'dogzz',
        translationData: {
            isEnabled: {
                [TranslationDataType.root]: true,
                [TranslationDataType.plural]: true
            },
            values: {
                [TranslationDataType.root]: 'dog',
                [TranslationDataType.plural]: 'true'
            }
        }
    },
    wantedDog: {
        word: 'big',
        translationData: {
            isEnabled: {
                [TranslationDataType.root]: true,
                [TranslationDataType.determiner]: false,
                [TranslationDataType.plural]: true,
                [TranslationDataType.adjective]: false
            },
            values: {
                [TranslationDataType.root]: 'cat',
                [TranslationDataType.plural]: 'true'
            }
        }
    }
};

// TODO: Update params to be value arrays
function translate(inputValues: IInputState, outputValues: IInputState) {
    //const groupedInputs = groupValues([dogData.myDog, dogData.ourDog, dogData.bigDog, dogData.theCats, dogData.cats, dogData.dogs]);
    const groupedInputs = groupValues(Object.values(inputValues.values));

    const dependencyResolver = new DependencyResolver(groupedInputs);
}

translate({ currentId: 0, values: {} }, { currentId: 0, values: {} });

export default translate;