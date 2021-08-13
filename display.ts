

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
    //% blockId=easybit_set_led_state block="set led |%state| at port |%port|"
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
    //% blockId=easybit_set_led_brightness block="set led brightness(0~100) |%brightness| at port |%port| "
    //% weight=129
    //% brightness.min=0 brightness.max=100
    export function setLedBrightness(port: Easybit.AnalogPort, brightness: number) {
        Easybit.analogPortHold(port);
        let pin = Easybit.toAnalogPin(port);
        pins.analogWritePin(pin, pins.map(brightness, 0, 100, 0, 1023));
        Easybit.analogPortRelease(port);
    }

    /**
     * Set light brightness.
     * @param port easybit port connect to
     * @param brightness brightness level to set
     */
    //% blockId=easybit_set_light_brightness block="set light led brightness(0~100) |%brightness| at port |%port| "
    //% weight=129
    //% brightness.min=0 brightness.max=100
    export function setLightBrightness(port: Easybit.AnalogPort, brightness: number) {
        Easybit.analogPortHold(port);
        let pin = Easybit.toAnalogPin(port);
        pins.analogWritePin(pin, pins.map(brightness, 0, 100, 0, 1023));
        Easybit.analogPortRelease(port);
    }

    let neoStrip:neopixel.Strip  = null;

    /**
     * set rgb led color to a predefined color. 
     * @param port easybit port connect to
     * @param color color
    */
    //% blockId="Easybit_set_rgb_led_color" block="set rgb led color |%color| at port |%port| "
    //% weight=129
    export function setRGBLedColor(port: Easybit.DigitalPort, color: Easybit.Colors): void {
        let pin = Easybit.toDigitalPin(port);
        if (neoStrip == null) {
            neoStrip = neopixel.create(pin, 1, NeoPixelMode.RGB);
            neoStrip.setBrightness(75);
        }
        neoStrip.setPixelColor(0, color);
        neoStrip.show();
    }

    /**
     * set rgb led brightness. 
     * @param port easybit port connect to
     * @param color color
    */
    //% blockId="Easybit_set_rgb_led_brightness" block="set rgb led brightness |%level| at port |%port| "
    //% weight=129
    //% level.min=0 level.max=100
    export function setRGBLedsBrightness(port: Easybit.DigitalPort, level: number): void {
        let pin = Easybit.toDigitalPin(port);
        if (neoStrip == null) {
            neoStrip = neopixel.create(pin, 1, NeoPixelMode.RGB);
            neoStrip.setBrightness(75);
        }

        neoStrip.setBrightness(pins.map(level, 0, 100, 0, 255));
        neoStrip.show();
    }

    /**
     * turn segment display on
     */
    //% blockId=easybit_turn_segment_display_on block="turn segment display on"
    //% weight=128
    export function digitalTubeOn() {
        tm1650.on();
    }

    /**
     * turn segment display off
     */
    //% blockId=easybit_turn_segment_display_off block="turn segment display off"
    //% weight=127
    export function digitalTubeOff() {
        tm1650.off();
    }

    /**
     * clear segment display
     */
    //% blockId=easybit_clear_segment_display block="clear segment display display"
    //% weight=126
    export function digitalTubeClear() {
        tm1650.clear();
    }

    /**
     * set segment display intensity
     */
    //% blockId=easybit_set_segment_display_intensity block="set segment display intensity |%value|"
    //% weight=125
    //% value.min=0 value.max=8
    export function digitalTubeSetIntensity(value: number) {
        tm1650.setBrightness(value);
    }

    /**
     * show digital at segment display
     * @param value number to be shown on display
     * @param pos position of number
     */
    //% blockId=easybit_segment_display_show_digit block="show digit |%value| at bit |%pos|"
    //% weight=124
    export function digitalTubeShowDigit(value: number, pos : number) {
        tm1650.showDigit(value, pos);
    }

    /**
     * show number on segment display
     * @param value number to be shown on display
     */
    //% blockId=easybit_segment_display_show_number block="show number |%value|"
    //% weight=123
    export function digitalTubeShowNumber(value: number) {
        tm1650.showNumber(value);
    }

    /**
     * set dot point state on segment display
     * @param pos bit to show
     * @param show show or not
     */
    //% blockId=easybit_segment_display_set_dp_state block="show dot at |%pos| |%show|"
    //% weight=122
    export function digitalTubeSetPoint(pos: number, show: boolean) {
        tm1650.showDotPoint(pos, show);
    }
}