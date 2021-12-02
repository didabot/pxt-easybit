//% color=#C700CA icon="\uf11b"
//% groups='["Push Button","Touch Button","Potentiometer"]'
namespace Controls {
    /**
     * Do something when a push button is pushed down and released again.
     * @param port microbit digital pin
     * @param body code to run when event is raised
     */
    //% blockId=controls_push_button_pressed block="on push button |%port| pressed"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=4
    //% weight=130
    //% group="Push Button"
    export function onPushButtonPressed(port: Controller.DigitalPort, body: Action) {
        let pin: DigitalPin = Controller.toDigitalPin(port);
        pins.setEvents(pin, PinEventType.Edge);
        control.onEvent(Controller.toEventSource(pin), EventBusValue.MICROBIT_PIN_EVT_FALL, body);
    }

    /**
     * Check wether the push button is pressed or not.
     * @param port microbit digital port
     */
    //% blockId=controls_is_push_button_pressed block="push button |%pin| pressed"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=4
    //% weight=129
    //% group="Push Button"
    export function isPushButtonPressed(port: Controller.DigitalPort): boolean {
        let pin: DigitalPin = Controller.toDigitalPin(port);
        return (pins.digitalReadPin(pin) == 0) ? true : false;
    }

    /**
     * Do something when a touch button is touched down and released again.
     * @param port microbit digital pin
     * @param body code to run when event is raised
     */
    //% blockId=controls_touch_button_touched block="on touch button |%port| pressed"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=4
    //% weight=128
    //% group="Touch Button"
    export function onTouchButtonTouched(port: Controller.DigitalPort, body: Action) {
        let pin: DigitalPin = Controller.toDigitalPin(port);
        pins.setEvents(pin, PinEventType.Edge)
        control.onEvent(Controller.toEventSource(pin), EventBusValue.MICROBIT_PIN_EVT_FALL, body);
    }

    /**
     * Check wether the push button is touched or not.
     * @param pin microbit digital pin
     */
    //% blockId=controls_is_touch_button_touched block="touch button |%port| pressed"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=4
    //% weight=127
    //% group="Touch Button"
    export function isTouchButtonTouched(port: Controller.DigitalPort): boolean {
        let pin: DigitalPin = Controller.toDigitalPin(port);
        return (pins.digitalReadPin(pin) == 0) ? true : false;
    }

    /**
     * Get the rotation sensor position.
     * @param port microbit analog port
     */
    //% blockId=controls_get_rotation_angle block="rotation sensor |%port| angle(0~280)"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=2
    //% weight=126
    //% group="Potentiometer"
    export function rotationAngle(port: Controller.AnalogInputPort): number {
        let pin: AnalogPin = Controller.toAnalogInputPin(port);
        let level = pins.map(
            pins.analogReadPin(pin),
            0,
            1023,
            0,
            280);
        return Math.round(level);
    }
}