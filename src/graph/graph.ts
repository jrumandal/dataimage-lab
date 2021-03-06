import { PixelColor, BYTE_PER_PIXEL, COLORS } from "../interfaces/pixel.interface";
import { Point } from "../interfaces/pointer.interface";
import * as mathFunctions from "../utils/math-functions";
import { MAX_BYTE_VALUE } from "../constants";

/**
 * Contains implementation to manage and manipulate pixels,
 * PLEASE dont mind for the documentation.
 * Its free code :P
 */
export class Graph {
    private _width: number;
    private _height: number;
    private _context: CanvasRenderingContext2D;

    private _TRANSITION_COORDS: Point;

    constructor(private _canvas: HTMLCanvasElement) {
        const { width, height } = this._canvas;
        this._width = width;
        this._height = height;
        this._TRANSITION_COORDS = {
            x: -this._width/2,
            y: -this._height/2,
        };
        this._context = this._canvas.getContext('2d');
    };

    mutatePixel(bufferRef: Uint8ClampedArray, index: number, { r, g, b, a, }: Partial<PixelColor>): void {
        bufferRef[index + 0] = r;
        bufferRef[index + 1] = g;
        bufferRef[index + 2] = b;
        bufferRef[index + 3] = a;
    };

    drawBuffer(bufferRef: Uint8ClampedArray): void {
        const newImageData = this._context.createImageData(this._width, this._height);
        newImageData.data.set(bufferRef);

        this._context.putImageData(newImageData, 0, 0);
    };

    generateBuffer(): Uint8ClampedArray {
        return new Uint8ClampedArray(this._width * this._height * Uint8ClampedArray.BYTES_PER_ELEMENT * BYTE_PER_PIXEL);
    };

    applyTransition(p: Point): Point {
        p.x += this._TRANSITION_COORDS.x;
        p.x *= -1; // reverse as the origin(O) is on top left corner
        p.y += this._TRANSITION_COORDS.y;
        p.y *= -1; // reverse as the origin(O) is on top left corner

        return p;
    };

    drawAxis(bufferRef: Uint8ClampedArray): void {
        for (let i = 0; i < bufferRef.byteLength; i += BYTE_PER_PIXEL) {
            const p = this.applyTransition({
                x: (i/4) % this._width,
                y: Math.floor((i/4) / this._width),
            });
    
            if(mathFunctions.x(p) || mathFunctions.y(p)) this.mutatePixel(bufferRef, i, COLORS.BLACK);
        }
    };

    drawFunction(bufferRef: Uint8ClampedArray, mathFunction: (...args: any[]) => any, color: Partial<PixelColor>): void {
        for (let i = 0; i < bufferRef.byteLength; i += BYTE_PER_PIXEL) {
            const p = this.applyTransition({
                x: (i/4) % this._width,
                y: Math.floor((i/4) / this._width),
            });
    
            if(mathFunction(p)) this.mutatePixel(bufferRef, i, color);
        }
    };
    
    drawGraph(): void {
        const buffer: Uint8ClampedArray = this.generateBuffer();
        
        this.drawFunction(buffer, mathFunctions.abs, COLORS.CYAN);
        this.drawFunction(buffer, mathFunctions.circonference, COLORS.RED);
        this.drawFunction(buffer, mathFunctions.curve, COLORS.BLUE);
        this.drawFunction(buffer, mathFunctions.reversedSinFunction, COLORS.PINK);
        this.drawFunction(buffer, mathFunctions.sin, COLORS.VIOLET);
        
        this.drawAxis(buffer);
        this.drawBuffer(buffer);
    };

    drawGradient(bufferRef: Uint8ClampedArray) {
        for (let i = 0; i < bufferRef.byteLength; i++) {
            this.mutatePixel(bufferRef, i, {
                ...COLORS.CYAN,
                r: Math.floor(i / MAX_BYTE_VALUE % MAX_BYTE_VALUE),
            });
        }
    };
}