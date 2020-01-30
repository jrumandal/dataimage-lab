import { EXT } from "../constants";

// PLEASE, DON'T ASK ME WHY IM USING SOME RANDOM CONSTANS INSIDE THE FUNCTIONS
export const
    /** Based on circonference function/formula (x^2 + x^2 = 1) with r=5, whatever is x^2 + x^2 <= 1 can be colored */
    circle = ({ x, y } : { x: number, y: number }) => Math.pow(x, 2) + Math.pow(y, 2) <= EXT,
    /** Based on circonference function/formula (x^2 + x^2 = 1) with r=EXT, whatever is x^2 + x^2 ~= EXT can be colored */
    circonference = ({ x, y } : { x: number, y: number }) => Math.pow(x, 2) + Math.pow(y, 2) >= EXT - 100 && Math.pow(x, 2) + Math.pow(y, 2) <= EXT + 100,
    /** No clue why this is not working, as log(x) = y, where log(x) - y ~= 0 should be colored */
    log = ({ x, y } : { x: number, y: number }) => Math.log(x) - y === 1,
    /** Absolute value */
    abs = ({ x, y } : { x: number, y: number }) => Math.abs(x) === y,
    /** X axis */
    x = ({ x, y } : { x: number, y: number }) => x === 0,
    /** Y axis */
    y = ({ x, y } : { x: number, y: number }) => y === 0,
    /** U, forgot how this is called */
    curve = ({ x, y } : { x: number, y: number }) => (1/20)*Math.pow(x, 2) + 3*x >= y - 1 && (1/20)*Math.pow(x, 2) + 3*x <= y + 1,
    /** Considering sin(x) = y, sin(x) - y ~= 0 should be colored. I multiply to make sinusoide bigger. It doesnt work, but whatever */
    sin = ({ x, y } : { x: number, y: number }) => {
        const EXXX = 10,
              sinX = Math.sin(x) * 10;

        return sinX >= y - EXXX && sinX <= y + EXXX;
    },
    /** Sin function, cool curve if drawed properly. Search for it...is really cool */
    reversedSinFunction = ({ x, y } : { x: number, y: number }, reverted = true) => {
        const EXXX = 1,
              sinX = Math.sin(Math.PI * x) / Math.PI * x,
              sinY = Math.sin(Math.PI * y) / Math.PI * y;

        return (
            reverted
            ? sinY >= x - EXXX && sinY <= x + EXXX
            : sinX >= y - EXXX && sinX <= y + EXXX
        );
    }
;