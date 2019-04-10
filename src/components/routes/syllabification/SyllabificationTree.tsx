import * as React from 'react';
import { splitIpaIntoSymbols } from '../../../api/linguistics/ipa/util';
import { ISyllable } from '../../../api/linguistics/phonology/syllabification';
import { drawLine } from '../../../api/util/CanvasUtil';
import CanvasContainer from '../../../api/util/CanvasContainer';
import Position from '../../../models/Position';
import Card from '../../styled/card/Card';
import { ISyllabificationDataProps } from './SyllabificationData';

const letterWidthInPx = 16;
const letterSpacingInPx = 16;
const canvasHeightInPx = 180;
const spaceBelowIdentifiersInPx = 4;
const relationLineOffsetInPx = 6;
const letterXOffsetInPx = 2;

const letterDrawHeight = canvasHeightInPx - letterWidthInPx;

const labelHeightMultipliers = {
    type: 2,
    rhyme: 3.5,
    syllable: 5
};

const fontFamily = '"Google Sans", "Product Sans", "Roboto", sans-serif';

const syllableIdentifiers = {
    sigma: 'σ',
    nucleus: 'N',
    coda: 'C',
    onset: 'O',
    rhyme: 'R'
};

const canvasContainerProps = {
    style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

function drawSyllableIdentifier(canvas: HTMLCanvasElement, x: number, y: number, identifier: string, size: number = letterWidthInPx) {
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        return;
    }

    ctx.font = `${size}px ${fontFamily}`;
    ctx.fillText(identifier, x, y);
}

function getOffset(i: number) {
    return i * (letterWidthInPx + letterSpacingInPx);
}

function getLetterOffset(i: number) {
    return getOffset(i) + letterXOffsetInPx;
}

function getBottomOffset(i: number) {
    return canvasHeightInPx - getOffset(i);
}

function getIdentifierPosition(startIndex: number, offset: Position = { x: 0, y: 0 }): Position {
    return {
        x: getOffset(startIndex) + offset.x,
        y: getBottomOffset(labelHeightMultipliers.type) + offset.y
    };
}

interface ITypeRelationsParams {
    canvas: HTMLCanvasElement;
    identifier: string;
    elements: string[];
    startIndex: number;

}

function drawTypeRelations({ canvas, identifier, elements, startIndex }: ITypeRelationsParams) {
    if (!elements.length) {
        return;
    }

    const identifierPosition = getIdentifierPosition(startIndex);
    const identifierLineEndPosition = { x: getLetterOffset(startIndex) + relationLineOffsetInPx, y: getBottomOffset(labelHeightMultipliers.type) + spaceBelowIdentifiersInPx };
    const letterStartHeight = letterDrawHeight - letterWidthInPx;

    drawSyllableIdentifier(canvas, identifierPosition.x, identifierPosition.y, identifier);

    for (let j = 0; j < elements.length; ++j) {
        const letterIndex = startIndex + j;

        drawLine(canvas,
            { x: getLetterOffset(letterIndex) + relationLineOffsetInPx, y: letterStartHeight },
            identifierLineEndPosition
        );
    }
}

interface ISyllableIdentifierParams {
    canvas: HTMLCanvasElement;
    syllable: ISyllable;
    onsetIndex: number;
    nucleusIndex: number;
    codaIndex: number;
}

function drawSigmaAndAttachNodes({ canvas, syllable, onsetIndex, nucleusIndex, codaIndex }: ISyllableIdentifierParams) {
    const typePositionOffset = { x: relationLineOffsetInPx, y: -letterSpacingInPx };
    const sigmaRhymePositionOffset = { x: relationLineOffsetInPx, y: relationLineOffsetInPx };

    const sigmaBasePosition = { x: getOffset(nucleusIndex), y: getBottomOffset(labelHeightMultipliers.syllable) };
    const sigmaPosition = { x: sigmaBasePosition.x + sigmaRhymePositionOffset.x, y: sigmaBasePosition.y + sigmaRhymePositionOffset.y };

    const nucleusPosition = getIdentifierPosition(nucleusIndex, typePositionOffset);
    const onsetPosition = getIdentifierPosition(onsetIndex, typePositionOffset);
    const codaPosition = getIdentifierPosition(codaIndex, typePositionOffset);

    drawSyllableIdentifier(canvas, sigmaBasePosition.x, sigmaBasePosition.y, syllableIdentifiers.sigma, letterWidthInPx * 1.35);

    if (syllable.isRhyme) {
        const rhymeBasePosition = { x: getOffset(nucleusIndex), y: getBottomOffset(labelHeightMultipliers.rhyme) + relationLineOffsetInPx };
        const rhymeBottomPosition = { x: rhymeBasePosition.x + sigmaRhymePositionOffset.x, y: rhymeBasePosition.y + relationLineOffsetInPx };

        drawSyllableIdentifier(canvas, rhymeBasePosition.x, rhymeBasePosition.y, syllableIdentifiers.rhyme);

        drawLine(canvas, nucleusPosition, rhymeBottomPosition);
        drawLine(canvas, { x: rhymeBottomPosition.x, y: rhymeBottomPosition.y - letterWidthInPx - relationLineOffsetInPx }, sigmaPosition);

        if (syllable.coda.length) {
            drawLine(canvas, codaPosition, rhymeBottomPosition);
        }
    } else {
        drawLine(canvas, nucleusPosition, sigmaPosition);

        if (syllable.coda.length) {
            drawLine(canvas, codaPosition, sigmaPosition);
        }
    }

    if (syllable.onset.length) {
        drawLine(canvas, onsetPosition, sigmaPosition);
    }
}

function drawWord(canvas: HTMLCanvasElement, word: string) {
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        console.error('Could not get canvas context');
        return;
    }

    ctx.font = `${letterWidthInPx}px ${fontFamily}`;

    const symbols = splitIpaIntoSymbols(word);

    for (let i = 0; i < symbols.length; ++i) {
        const letterOffset = getLetterOffset(i);
        const xOffset = symbols[i].length > 1 ? -letterXOffsetInPx : letterXOffsetInPx;

        ctx.fillText(symbols[i], letterOffset + xOffset, letterDrawHeight);
    }
}

const SyllabificationTree: React.FC<ISyllabificationDataProps> = ({ word, syllables }) => {
    function writeCanvas(canvas: HTMLCanvasElement) {
        canvas.width = (word.length * (letterWidthInPx + letterSpacingInPx));
        canvas.height = canvasHeightInPx;

        drawWord(canvas, word);

        let i = 0;
        for (const syllable of syllables) {
            const syllableStartIndex = i;

            const onsetIndex = syllableStartIndex;
            const nucleusIndex = syllableStartIndex + syllable.onset.length;
            const codaIndex = nucleusIndex + syllable.nucleus.length;

            const typeRelations: Array<[number, string]> = [
                [onsetIndex, 'onset'],
                [nucleusIndex, 'nucleus'],
                [codaIndex, 'coda']
            ];

            for (const [startIndex, name] of typeRelations) {
                drawTypeRelations({
                    canvas,
                    startIndex,
                    elements: syllable[name],
                    identifier: syllableIdentifiers[name]
                });
            }

            i = syllable.coda.length ? codaIndex + 1 : codaIndex;

            console.log({ canvas, onsetIndex, nucleusIndex, codaIndex, syllable });

            drawSigmaAndAttachNodes({
                canvas,
                onsetIndex,
                nucleusIndex,
                codaIndex,
                syllable
            });
        }
    }

    return (
        <Card title={`Syllabification tree for "${word}"`}>
            <CanvasContainer onCanvasCreate={writeCanvas} divProps={canvasContainerProps} />
        </Card>
    );
};

export default SyllabificationTree;