//% color=#009ede icon="\uf11b"
namespace Controls {
    /**
     * Connect a push button to Easybit and do something when pushed down and release.
     * @param port Easybit port to be connected to
     * @param body code to run when event is raised
     */
    //% blockId=Easybit_push_button_pressed block="on push button pressed at port |%port| "
    //% weight=128
    export function onPushButtonPressed(port: Easybit.DigitalPort, body: Action) {
        let pin = Easybit.toDigitalPin(port);
        pins.setEvents(pin, PinEventType.Edge);
        let func = () => {
            body();
        }

        control.onEvent(pin, EventBusValue.MICROBIT_PIN_EVT_FALL, func);
    }

    /**
     * Get the push button state (pressed or not) .
     * @param port Easybit port to be connected to
     */
    //% blockId=Easybit_is_push_button_pressed block="push button pressed at port |%port| "
    //% weight=130
    export function isPushButtonPressed(port: Easybit.DigitalPort): boolean {
        let pin = Easybit.toDigitalPin(port);
        let state = pins.digitalReadPin(pin);   
        return (state == 0) ? true : false;
    }

    /**
     * Connect a touch button to Easybit and do something when touch.
     * @param port Easybit port to be connected to
     * @param body code to run when event is raised
     */
    //% blockId=Easybit_touch_button_touched block="on touch button touched at port |%port|"
    //% weight=127
    export function onTouchButtonTouched(port: Easybit.DigitalPort, body: Action) {
        let pin = Easybit.toDigitalPin(port);
        led.enable(false);
        pins.setEvents(pin, PinEventType.Edge)
        let func = () => {
            body();
            //led.enable(true);
        }

        control.onEvent(pin, EventBusValue.MICROBIT_PIN_EVT_RISE, func);
    }

    /**
     * Get the touch button state (touched or not).
     * @param port Easybit port to be connected to.
     */
    //% blockId=Easybit_is_touch_button_touched block="touch button touched at port |%port|"
    //% weight=129
    export function isTouchButtonTouched(port: Easybit.DigitalPort): boolean {
        let pin = Easybit.toDigitalPin(port);
        let state = pins.digitalReadPin(pin);        
        return (state == 0) ? true : false;
    }
}