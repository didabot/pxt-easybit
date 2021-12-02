// Auto-generated. Do not edit.



    //% color=#DA007A icon="\uf1eb"
declare namespace IR {

    /**
     * Init ir module.
     * @param pin microbit pin
     */
    //% blockId=ir_setup_pin block="connect ir module to |%pin|"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4 shim=IR::initIR
    function initIR(pin: Pins): void;

    /**
     * Do something when a button on ir controller is presssed.
     * @param btn button on
     * @param body code to run when event is raised
     */
    //% blockId=ir_button_pressed block="on ir button |%btn| pressed"
    //% btn.fieldEditor="gridpicker" btn.fieldOptions.columns=4 shim=IR::onPressEvent
    function onPressEvent(btn: RemoteButton, body: () => void): void;
}

// Auto-generated. Do not edit. Really.
