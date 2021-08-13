//% color=#009ede icon="\uf085"
namespace Drive {
    /**
     * set fan speed.
     * @param port easybit port connect to
     * @param speed fan speed expect to set
     */
    //% blockId=easybit_set_fan_speed block="set fan speed |%speed| at port |%port| "
    //% weight=130
    //% speed.min=0 speed.max=100
    export function setFanSpeed(port: Easybit.AnalogPort, speed: number) {
        Easybit.analogPortHold(port);
        let pin = Easybit.toAnalogPin(port);
        pins.analogWritePin(pin, pins.map(speed, 0, 100, 0, 1023));
        Easybit.analogPortRelease(port);
    }
}