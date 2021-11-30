//% color=#8000C9 icon="\uf085"
namespace Drive {
    /**
     * set fan speed.
     * @param pin microbit analog pin
     * @param speed fan speed expect to set
     */
    //% blockId=drive_set_fan_speed block="set fan speed |%speed| at port |%pin| "
    //% weight=130
    //% speed.min=0 speed.max=100
    export function setFanSpeed(pin: AnalogPin, speed: number) {
        pins.analogWritePin(pin, pins.map(speed, 0, 100, 0, 1023));
    }
}