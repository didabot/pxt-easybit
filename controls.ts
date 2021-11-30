//% color=#C700CA icon="\uf11b"
//% groups='["Push Button","Touch Button","Potentiometer"]'
namespace Controls {
    /**
     * Connect a push button to Easybit and do something when pushed down and release.
     * @param pin microbit digital pin
     * @param body code to run when event is raised
     */
    //% blockId=controls_push_button_pressed block="on push button pressed at port |%pin| "
    //% weight=130
    //% group="Push Button"
    export function onPushButtonPressed(pin: DigitalPin, body: Action) {
        pins.setEvents(pin, PinEventType.Edge);
        let func = () => {
            body();
        }

        control.onEvent(pin, EventBusValue.MICROBIT_PIN_EVT_FALL, func);
    }

    /**
     * Get the push button state (pressed or not) .
     * @param pin microbit digital pin
     */
    //% blockId=controls_is_push_button_pressed block="push button pressed at port |%pin| "
    //% weight=129
    //% group="Push Button"
    export function isPushButtonPressed(pin: DigitalPin): boolean {
        let state = pins.digitalReadPin(pin);   
        return (state == 0) ? true : false;
    }

    /**
     * Connect a touch button to Easybit and do something when touch.
     * @param pin microbit digital pin
     * @param body code to run when event is raised
     */
    //% blockId=controls_touch_button_touched block="on touch button touched at port |%pin|"
    //% weight=128
    //% group="Touch Button"
    export function onTouchButtonTouched(pin: DigitalPin, body: Action) {
        pins.setEvents(pin, PinEventType.Edge)
        let func = () => {
            body();
        }

        control.onEvent(pin, EventBusValue.MICROBIT_PIN_EVT_RISE, func);
    }

    /**
     * Get the touch button state (touched or not).
     * @param pin microbit digital pin
     */
    //% blockId=controls_is_touch_button_touched block="touch button touched at port |%pin|"
    //% weight=127
    //% group="Touch Button"
    export function isTouchButtonTouched(pin: DigitalPin): boolean {
        let state = pins.digitalReadPin(pin);        
        return (state == 0) ? true : false;
    }

    /**
     * Get the rotation angle.
     * @param pin microbit analog pin
     */
    //% blockId=controls_get_rotation_angle block="rotation angle(0~280) at port |%pin|"
    //% weight=126
    //% group="Potentiometer"
    export function rotationAngle(pin: AnalogPin): number {
        let level = pins.map(
            pins.analogReadPin(pin),
            0,
            1023,
            0,
            280);
        return Math.round(level);
    }

}