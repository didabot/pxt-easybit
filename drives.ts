
//% color=#8000C9 icon="\uf085"
//% groups='["Analog","Digital","IIC"]'
namespace Drives {
    /**
     * set fan speed.
     * @param port microbit analog output port
     * @param speed fan speed expect to set
     */
    //% blockId=drive_set_fan_speed block="set fan speed |%speed| at port |%port|"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=4
    //% group="Analog"
    //% speed.min=0 speed.max=100
    export function setFanSpeed(port: Controller.AnalogOutPutPort, speed: number) {
        let pin: AnalogPin = Controller.toAnalogOutputPin(port);
        pins.analogWritePin(pin, pins.map(speed, 0, 100, 0, 1023));
    }
}