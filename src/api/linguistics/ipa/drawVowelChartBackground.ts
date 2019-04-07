import Position from '../../../models/Position';
import { drawLine } from '../../util/CanvasUtil';

export const vowelChartSideLengthInPx = 300;

const strokeWidthInPx = 4;

function drawWeirdTrapezoidThing(canvas: HTMLCanvasElement, multiplier: number, offset: Position = { x: 0, y: 0 }) {
    const sideLength = vowelChartSideLengthInPx * multiplier;
    const centerPosition = { x: (canvas.width / 2) + offset.x, y: (canvas.height / 2) + offset.y };

    const topLeftPosition = { x: centerPosition.x - sideLength, y: centerPosition.y - (sideLength / 2) };

    const rectangleCorners = {
        bottomLeft: { x: topLeftPosition.x + sideLength, y: topLeftPosition.y + sideLength },
        bottomRight: { x: topLeftPosition.x + (sideLength * 2), y: topLeftPosition.y + sideLength },
        topRight: { x: topLeftPosition.x + (sideLength * 2), y: topLeftPosition.y },
        topLeft: { x: topLeftPosition.x + sideLength, y: topLeftPosition.y }
    };

    const rectangleCornerValues = Object.values(rectangleCorners);

    for (let i = 0; i < rectangleCornerValues.length - 1; ++i) {
        drawLine(canvas, rectangleCornerValues[i], rectangleCornerValues[i + 1], strokeWidthInPx);
    }

    drawLine(canvas, rectangleCorners.bottomLeft, topLeftPosition, strokeWidthInPx);
    drawLine(canvas, rectangleCorners.topLeft, topLeftPosition, strokeWidthInPx);
}

function drawVowelChartBackground() {
    const canvas = document.createElement('canvas');

    canvas.width = vowelChartSideLengthInPx * 2;
    canvas.height = vowelChartSideLengthInPx;

    drawWeirdTrapezoidThing(canvas, 1);
    drawWeirdTrapezoidThing(canvas, 0.7, { x: 35, y: 0 });

    return canvas.toDataURL();
}

export default drawVowelChartBackground;