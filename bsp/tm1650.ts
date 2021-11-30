namespace tm1650 {
    let COMMAND_I2C_ADDRESS = 0x24
    let DISPLAY_I2C_ADDRESS = 0x34
    let _SEG = [0x3F, 0x06, 0x5B, 0x4F, 0x66, 0x6D, 0x7D, 0x07, 0x7F, 0x6F, 0x77, 0x7C, 0x39, 0x5E, 0x79, 0x71];

    let _intensity = 3
    let dbuf = [0, 0, 0, 0]

    export enum DotState {
        //% block="ON" enumval=0
        ON,
        //% block="OFF" enumval=1
        OFF         
    }

    function cmd(c: number) {
        pins.i2cWriteNumber(COMMAND_I2C_ADDRESS, c, NumberFormat.Int8BE)
    }

    function dat(bit: number, d: number) {
        pins.i2cWriteNumber(DISPLAY_I2C_ADDRESS + (bit % 4), d, NumberFormat.Int8BE)
    }

    export function on() {
        cmd(_intensity * 16 + 1)
    }

    export function off() {
        _intensity = 0
        cmd(0)
    }

    export function clear() {
        dat(0, 0)
        dat(1, 0)
        dat(2, 0)
        dat(3, 0)
        dbuf = [0, 0, 0, 0]
    }

    export function showDigit(num: number, bit: number) {
        dbuf[bit % 4] = _SEG[num % 16]
        dat(bit, _SEG[num % 16])
    }

    export function showNumber(num: number) {
        if (num < 0) {
            dat(0, 0x40) // '-'
            num = -num
        }
        else
            showDigit(Math.idiv(num, 1000) % 10, 0)
        showDigit(num % 10, 3)
        showDigit(Math.idiv(num, 10) % 10, 2)
        showDigit(Math.idiv(num, 100) % 10, 1)
    }

    export function showDotPoint(bit: number, show: boolean) {
        if (show) dat(bit, dbuf[bit % 4] | 0x80)
        else dat(bit, dbuf[bit % 4] & 0x7F)
    }

    export function setBrightness(dat: number) {
        if ((dat < 0) || (dat > 8))
            return;
        if (dat == 0)
            off()
        else {
            _intensity = dat
            cmd((dat << 4) | 0x01)
        }
    }

    function showHex(num: number) {
        if (num < 0) {
            dat(0, 0x40) // '-'
            num = -num
        }
        else
            showDigit((num >> 12) % 16, 0)
        showDigit(num % 16, 3)
        showDigit((num >> 4) % 16, 2)
        showDigit((num >> 8) % 16, 1)
    }
}
