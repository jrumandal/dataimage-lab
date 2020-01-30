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
        r: 0b11000000, // putting as binary to feel like this code is cooler
        b: 0b11000000,
        a: 0xff, // do you feel it? this is so powerful
    },
    RED: {
        r: 0b11000000,
        a: 0xff, // 255
    },
    BLUE: {
        r: 0,
        g: 0,
        b: 0b11111111,
        a: 0xff,
    },
    PINK: { // these are just bunch of random colors that might not relate to the name given
        r: 0b00000011,
        g: 0b11001000,
        b: 0b10100011,
        a: 0xff,
    },
    VIOLET: {
        r: 0b11001111,
        g: 0b00000111,
        b: 0b11111111,
        a: 0xff,
    },
    BLACK: {
        r: 0,
        g: 0,
        b: 0,
        a: 0xff,
    },
};