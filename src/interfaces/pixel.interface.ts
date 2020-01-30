/** Defines the structure of a pixel color */
export interface PixelColor {
    /** Red */
    r: number;
    /** Green */
    g: number;
    /** Blue */
    b: number;
    /** Alpha */
    a: number;
};

export const BYTE_PER_PIXEL = 4;

type SetColors = { [key: string]: Partial<PixelColor> };
/** Collection of preconfigured colors */
export const COLORS: SetColors = {
    CYAN: {
        r: 0b11000000,
        b: 0b11000000,
        a: 0xff,
    },
    RED: {
        r: 0b11000000,
        a: 0xff,
    },
};