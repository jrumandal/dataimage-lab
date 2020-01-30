import { EXT } from "../constants";

export const
    circle = ({ x, y } : { x: number, y: number }) => Math.pow(x, 2) + Math.pow(y, 2) <= EXT,
    circonference = ({ x, y } : { x: number, y: number }) => Math.pow(x, 2) + Math.pow(y, 2) >= EXT - 100 && Math.pow(x, 2) + Math.pow(y, 2) <= EXT + 100,
    log = ({ x, y } : { x: number, y: number }) => Math.log(x) - y === 1,
    abs = ({ x, y } : { x: number, y: number }) => Math.abs(x) === y,
    x = ({ x, y } : { x: number, y: number }) => x === 0,
    y = ({ x, y } : { x: number, y: number }) => y === 0,
    curve = ({ x, y } : { x: number, y: number }) => (1/20)*Math.pow(x, 2) + 3*x >= y - 1 && (1/20)*Math.pow(x, 2) + 3*x <= y + 1,
    sin = ({ x, y } : { x: number, y: number }) => {
        const EXXX = 10,
              sinX = Math.sin(x) * 10;

        return sinX >= y - EXXX && sinX <= y + EXXX;
    },
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