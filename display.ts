

//% color=#009ede icon="\uf26c"
namespace Display {
    export enum State {
        //% block="ON" enumval=0
        ON,
        //% block="OFF" enumval=1
        OFF 
    }

    /**
     * Set led state (on or off).
     * @param port easybit port to be connected to
     * @param state led state
     */
    //% blockId=easybit_set_led_state block="Turn led from |%port| |%state|"
    //% weight=130
    export function setLedState(port: Easybit.DigitalPort, state: State) {
        Easybit.digitalPortHold(port);
        let pin = Easybit.toDigitalPin(port);
        if (state == State.ON)
            pins.digitalWritePin(pin, 1);
        else
            pins.digitalWritePin(pin, 0);
        Easybit.digitalPortRelease(port);
    }

    /**
     * Set led brightness.
     * @param port easybit port connect to
     * @param brightness brightness level to set
     */
    //% blockId=easybit_set_led_brightness block="Set led from |%port| brightness |%brightness|"
    //% weight=129
    //% brightness.min=0 brightness.max=100
    export function setLedBrightness(port: Easybit.AnalogPort, brightness: number) {
        Easybit.analogPortHold(port);
        let pin = Easybit.toAnalogPin(port);
        pins.analogWritePin(pin, pins.map(brightness, 0, 100, 0, 1023));
        Easybit.analogPortRelease(port);
    }

    /**
     * turn digital tube display on
     */
    //% blockId=easybit_turn_digital_tube_on block="turn digital tube display on"
    //% weight=128
    export function digitalTubeOn() {
        tm1650.on();
    }

    /**
     * turn digital tube display off
     */
    //% blockId=easybit_turn_digital_tube_off block="turn digital tube display off"
    //% weight=127
    export function digitalTubeOff() {
        tm1650.off();
    }

    /**
     * clear digital tube display
     */
    //% blockId=easybit_clear_digital_tube_display block="clear digital tube display"
    //% weight=126
    export function digitalTubeClear() {
        tm1650.clear();
    }

    /**
     * set digital tube display intensity
     */
    //% blockId=easybit_set_digital_tube_display_intensity block="set digital tube display intensity |%value|"
    //% weight=125
    //% value.min=0 value.max=8
    export function digitalTubeSetIntensity(value: number) {
        tm1650.setBrightness(value);
    }

    /**
     * clear digital tube display
     * @param value number to be shown on display
     * @param pos position of number
     */
    //% blockId=easybit_digital_tube_show_digit block="show |%value| at |%pos| bit"
    //% weight=124
    export function digitalTubeShowDigit(value: number, pos : number) {
        tm1650.showDigit(value, pos);
    }

    /**
     * show number on digital tube display
     * @param value number to be shown on display
     */
    //% blockId=easybit_digital_tube_show_number block="show number |%value|"
    //% weight=123
    export function digitalTubeShowNumber(value: number) {
        tm1650.showNumber(value);
    }

    /**
     * set dot point state on digital tube display
     * @param pos bit to show
     * @param show show or not
     */
    //% blockId=easybit_digital_tube_set_dp_state block="set dot point at |%pos| state |%show|"
    //% weight=122
    export function digitalTubeSetPoint(pos: number, show: boolean) {
        tm1650.showDotPoint(pos, show);
    }
}