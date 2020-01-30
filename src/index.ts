const canvas1: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas1');
const canvas1context = canvas1.getContext('2d');
const { width, height } = canvas1;
const imageData: ImageData = canvas1context.createImageData(width, height);

const BYTE_PER_PIXEL = 4;
const buffer = new Uint8ClampedArray(width * height * Uint8ClampedArray.BYTES_PER_ELEMENT * BYTE_PER_PIXEL);

const colors = {
    cyan: {
        r: 0b11000000,
        // g: 0x0,
        b: 0b11000000,
        a: 0xff,
    },
    red: {
        r: 0b11000000,
        a: 0xff,
    },
};

const setPixel = (arrBuffer: Uint8ClampedArray, i: any, { r, g, b, a }: any) => {
    arrBuffer[i + 0] = r;
    arrBuffer[i + 1] = g;
    arrBuffer[i + 2] = b;
    arrBuffer[i + 3] = a;
};

const updateImageData = () => {
    imageData.data.set(buffer);
    canvas1context.putImageData(imageData, 0, 0);
};

const doGradient = () => {
    for (let i = 0; i < buffer.byteLength; i++) {
        setPixel(buffer, i, {
            ...colors.cyan,
            r: Math.floor(i / 256 % 256),
        });
    }
};

const doFillAsync = () => {
    for (let i = 0; i < buffer.byteLength; i++) {
        const j = i;

        setTimeout(() => {
            setPixel(buffer, i, {
                ...colors.cyan,
                r: Math.floor(i / 256 % 256),
            });

            updateImageData();
        }, 0);
    }
};

const fillAsync = (buffer: any, j: any, color: any) => {
    setTimeout(() => {
        setPixel(buffer, j, color);
        updateImageData();
    }, 0);
};

const EXT = 10000;
const formulas = {
    circle: ({ x, y } : { x: number, y: number }) => Math.pow(x, 2) + Math.pow(y, 2) <= EXT,
    circonference: ({ x, y } : { x: number, y: number }) => Math.pow(x, 2) + Math.pow(y, 2) >= EXT - 100 && Math.pow(x, 2) + Math.pow(y, 2) <= EXT + 100,
    log: ({ x, y } : { x: number, y: number }) => Math.log(x) - y === 1,
    abs: ({ x, y } : { x: number, y: number }) => Math.abs(x) === y,
    x: ({ x, y } : { x: number, y: number }) => x === 0,
    y: ({ x, y } : { x: number, y: number }) => y === 0,
    curve: ({ x, y } : { x: number, y: number }) => (1/20)*Math.pow(x, 2) + 3*x >= y - 1 && (1/20)*Math.pow(x, 2) + 3*x <= y + 1,
    sin: ({ x, y } : { x: number, y: number }) => {
        const EXXX = 1,
              sinX = Math.sin(x) * 10;

        return sinX >= y - EXXX && sinX <= y + EXXX;
    },
    reversedSinFunction: ({ x, y } : { x: number, y: number }, reverted = true) => {
        const EXXX = 1,
              sinX = Math.sin(Math.PI * x) / Math.PI * x,
              sinY = Math.sin(Math.PI * y) / Math.PI * y;

        return (
            reverted
            ? sinY >= x - EXXX && sinY <= x + EXXX
            : sinX >= y - EXXX && sinX <= y + EXXX
        );
    },
};

const shiftCoord = {
    x: -width/2,
    y: -width/2,
};

const doFormula = async (mathFunction = formulas.sin) => {
    for (let i = 0; i < buffer.byteLength; i+=4) {
        const p = {
            x: (i/4) % width,
            y: Math.floor((i/4) / width),
        };

        p.x += shiftCoord.x;
        p.x *= -1;
        p.y += shiftCoord.y;
        p.y *= -1;

        if(formulas.x(p) || formulas.y(p)) setPixel(buffer, i, colors.red);
        else if (mathFunction(p)) {
            setPixel(buffer, i, colors.cyan);
        }
    }
};

doFormula();
doFormula(formulas.curve);
doFormula(formulas.circonference);
doFormula(formulas.reversedSinFunction);

updateImageData();