
namespace Easybit {
    export enum Colors {
        //% block=red
        Red = 0xFF0000,
        //% block=orange
        Orange = 0xFFA500,
        //% block=yellow
        Yellow = 0xFFFF00,
        //% block=green
        Green = 0x00FF00,
        //% block=blue
        Blue = 0x0000FF,
        //% block=indigo
        Indigo = 0x4b0082,
        //% block=violet
        Violet = 0x8a2be2,
        //% block=purple
        Purple = 0xFF00FF,
        //% block=white
        White = 0xFFFFFF,
        //% block=black
        Black = 0x000000
    }

    export enum MultiPort {
        //% block=IIC
        IIC,
        //% block=UART
        UART
    }

    export const serialTxPin: SerialPin = SerialPin.P15;
    export const serialRxPin: SerialPin = SerialPin.P14;

    export function toEventSource(pin: DigitalPin): EventBusSource {
        let src: EventBusSource;
        switch (pin) {
            case DigitalPin.P0: src = EventBusSource.MICROBIT_ID_IO_P0; break;
            case DigitalPin.P1: src = EventBusSource.MICROBIT_ID_IO_P1; break;
            case DigitalPin.P2: src = EventBusSource.MICROBIT_ID_IO_P2; break;
            case DigitalPin.P3: src = EventBusSource.MICROBIT_ID_IO_P3; break;
            case DigitalPin.P4: src = EventBusSource.MICROBIT_ID_IO_P4; break;
            case DigitalPin.P6: src = EventBusSource.MICROBIT_ID_IO_P6; break;
            case DigitalPin.P7: src = EventBusSource.MICROBIT_ID_IO_P7; break;
            case DigitalPin.P8: src = EventBusSource.MICROBIT_ID_IO_P8; break;
            case DigitalPin.P9: src = EventBusSource.MICROBIT_ID_IO_P9; break;
            case DigitalPin.P10: src = EventBusSource.MICROBIT_ID_IO_P10; break;
            case DigitalPin.P12: src = EventBusSource.MICROBIT_ID_IO_P12; break;
        }

        return src;
    }

    export function i2cwrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = value;
        pins.i2cWriteBuffer(addr, buf);
    }

    export function i2cread(addr: number, reg: number) {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }

    export function i2ccmd(addr: number, value: number) {
        let buf = pins.createBuffer(1);
        buf[0] = value;
        pins.i2cWriteBuffer(addr, buf);
    }
}
