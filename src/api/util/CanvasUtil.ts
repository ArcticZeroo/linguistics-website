import Position from '../../models/Position';

export function drawLine(canvas: HTMLCanvasElement, from: Position, to: Position, strokeWidth?: number) {
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        return;
    }

    if (strokeWidth != null) {
        ctx.lineWidth = strokeWidth;
    }

    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
}