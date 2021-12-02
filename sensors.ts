//% color=#DD401B icon="\uf2c9"
//% groups='["Analog","Digital","IIC","UART"]'
namespace Sensors {
    /**
     * Get the sound value from a sound sensor.
     * @param port microbit analog input port
     */
    //% blockId=sensors_get_sound_level block="sound sensor |%port| loundness(0~100)"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=3
    //% weight=130
    //% group="Analog"
    export function soundLevel(port: Controller.AnalogInputPort): number {
        let voltage = 0;
        let level = 0;
        let pin: AnalogPin = Controller.toAnalogInputPin(port);
        voltage = pins.map(
            pins.analogReadPin(pin),
            0,
            1023,
            0,
            10
        );
 
        level = voltage;
        return Math.round(level);
    }

    /**
     * Get the level value from water level sensor.
     * @param port microbit analog input port
     */
    //% blockId=sensors_get_water_level block="water level sensor |%port| value(0~100)"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=3
    //% weight=129
    //% group="Analog"
    export function waterLevel(port: Controller.AnalogInputPort): number {
        let pin: AnalogPin = Controller.toAnalogInputPin(port);
        let level = pins.map(
            pins.analogReadPin(pin),
            0,
            700,
            0,
            100);
        return Math.round(level) ;
    }

    /**
     * Get the soil moisture value.
     * @param port microbit analog input port
     */
    //% blockId=sensors_get_soil_moisture block="soil mosture sensor |%port| value(0~100)"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=3
    //% weight=128
    //% group="Analog"
    export function soilMoisture(port: Controller.AnalogInputPort): number {
        let voltage = 0;
        let soilmoisture = 0;
        let pin: AnalogPin = Controller.toAnalogInputPin(port);
        voltage = pins.map(
            pins.analogReadPin(pin),
            0,
            1023,
            0,
            100
        );
 
        soilmoisture = voltage;
        return Math.round(soilmoisture);
    }

    /**
     * Get the light intensity.
     * @param port microbit analog input port
     */
    //% blockId=sensors_get_light_intensity block="light sensor |%port| intensity(0~100)"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=3
    //% weight=127
    //% group="Analog"
    export function lightIntensity(port: Controller.AnalogInputPort): number {
        let voltage = 0;
        let lightintensity = 0;
        let pin: AnalogPin = Controller.toAnalogInputPin(port);
        voltage = pins.map(
            pins.analogReadPin(pin),
            0,
            1023,
            0,
            100
        );
 
        lightintensity = voltage;
        return Math.round(lightintensity);
    }

    /**
     * Get the gas intensity.
     * @param port microbit analog input port
     */
    //% blockId=sensors_get_gas_intensity block="gas sensor |%port| intensity(0~100)"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=3
    //% weight=125
    //% group="Analog"
    export function gasIntensity(port: Controller.AnalogInputPort): number {
        let pin: AnalogPin = Controller.toAnalogInputPin(port);
        let level = pins.map(
            pins.analogReadPin(pin),
            0,
            1023,
            0,
            100);
        return Math.round(level);
    }

    /**
     * get environment temperature or humidity value
     * @param port microbit didgital port
     * @param src value type */
    //% weight=124
    //% blockId="sensors_get_enviroment_value" block="dht11 sensor |%port| |%src| value"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=4
    //% group="Digital"
    export function environmentValue(port: Controller.DigitalPort, src: dht11.DataSource): number {
        return dht11.read(src, Controller.toDigitalPin(port));
    }

    export enum Unit {
        //% block="mm" enumval=0
        mm,
        //% block="cm" enumval=1
        cm,
        //% block="inch" enumval=2
        inch
    }

    /**
     * Get distance from ultrasonic sensor.
     * @param port easybit port connect to
     * @param unit unit expect to display
     */
    //% blockId=sensors_get_sonar_distance block="ultrasonic sensor |%port| distance %unit"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=2
    //% weight=123
    //% group="IIC"
    export function sonar(port: Controller.SmartPort, unit: Unit): number {
        // determine the pin
        let trig: DigitalPin;
        let echo: DigitalPin;

        if (port == Controller.SmartPort.UART) {
            trig = DigitalPin.P15;
            echo = DigitalPin.P14;
        } else {
            trig = DigitalPin.P20;
            echo = DigitalPin.P19;
        }

        // send pulse
        pins.setPull(trig, PinPullMode.PullNone);
        pins.digitalWritePin(trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trig, 0);

        // read pulse
        let d = pins.pulseIn(echo, PulseValue.High, 25000);  //
        let distance = d * 9 / 6 / 58;

        if (distance > 400)
            distance = 0
        if (unit == Unit.mm)
            return Math.floor(distance * 10);
        else if (unit == Unit.cm)
            return Math.floor(distance);
        else
            return Math.floor(distance / 254); // inch
    }

    export enum Color {
        //% block="red" enumval=0
        red,
        //% block="green" enumval=1
        green,
        //% block="blue" enumval=2
        blue
    }

    /**
     * Get the color raw data from color sensor.
     * @param color data source to read from
     */
    //% blockId=sensors_read_color_data block="color sensor(iic) |%color| value"
    //% weight=122
    //% group="IIC"
    export function color(color: Color): number {
        let data: number;
        switch (color) {
            case Color.red: data = cls381.red(); break;
            case Color.green: data = cls381.green(); break;
            case Color.blue: data = cls381.blue(); break;
        }
        return data;
    }

    export enum TrackingState {
        //% block="◌" 
        State_0 = 0,
        //% block="●" 
        State_1 = 1
    }

    /**
     * Do something when tracking state is changed.
     * @param port microbit digital pin
     * @param body code to run when event is raised
     */
    //% blockId=sensors_tracking_state_changed block="on tracking sensor |%port| state changed"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=4
    //% weight=117
    //% group="Digital"
    export function onTrackingStateChanged(port: Controller.DigitalPort, body: Action) {
        let pin: DigitalPin = Controller.toDigitalPin(port);
        pins.setEvents(pin, PinEventType.Edge);
        control.onEvent(Controller.toEventSource(pin), EventBusValue.MICROBIT_PIN_EVT_FALL, body);
    }

    /**
     * Check the tracking state.
     * @param port microbit didgital port
     * @param state state to check with
     */
    //% blockId=sensors_tracking_state block="tracking sensor |%port| state is |%state|"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=4
    //% weight=121
    //% group="Digital"
    export function trackingStateIs(port: Controller.DigitalPort, state: TrackingState): boolean {
        let pin: DigitalPin = Controller.toDigitalPin(port);
        let pinValue = pins.digitalReadPin(pin);
        return (state == pinValue) ? true : false;
    }

    /**
     * Do something when magnet is detected by the hall sensor.
     * @param port microbit digital pin
     * @param body code to run when event is raised
     */
    //% blockId=sensors_magnet_detected block="on hall sensor |%port| detected magnet"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=4
    //% weight=116
    //% group="Digital"
    export function onMagnetDetected(port: Controller.DigitalPort, body: Action) {
        let pin: DigitalPin = Controller.toDigitalPin(port);
        pins.setEvents(pin, PinEventType.Edge);
        control.onEvent(Controller.toEventSource(pin), EventBusValue.MICROBIT_PIN_EVT_FALL, body);
   }

    /**
     * Get the hall sensor state.
     * @param port microbit didgital port
     */
    //% blockId=sensors_is_magnet_detected block="hall sensor |%port| detected magnet"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=4
    //% weight=116
    //% group="Digital"
    export function magnetDetected(port: Controller.DigitalPort): boolean {
        let pin: DigitalPin = Controller.toDigitalPin(port);
        return ( pins.digitalReadPin(pin) == 0) ? true : false;
    }

    /**
     * Do something when vibration sensor is detected by the vibration sensor.
     * @param port microbit digital pin
     * @param body code to run when event is raised
     */
    //% blockId=sensors_on_vibration_happened block="on vibration sensor |%port| detected vibration"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=4
    //% weight=115
    //% group="Digital"
    export function onVibration(port: Controller.DigitalPort, body: Action) {
        let pin: DigitalPin = Controller.toDigitalPin(port);
        pins.setEvents(pin, PinEventType.Edge);
        control.onEvent(Controller.toEventSource(pin), EventBusValue.MICROBIT_PIN_EVT_FALL, body);
    }

    /**
     * Get the vibration state.
     * @param port microbit didgital port
     */
    //% blockId=sensors_is_vibration_happened block="vibration sensor |%port| detected vibration"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=4
    //% weight=119
    //% group="Digital"
    export function vibrationHappened(port: Controller.DigitalPort): boolean {
        let pin: DigitalPin = Controller.toDigitalPin(port);
        return (pins.digitalReadPin(pin) == 1) ? true : false;
    }

    /**
     * Do something when crash sensor is pressed.
     * @param port microbit digital pin
     * @param body code to run when event is raised
     */
    //% blockId=sensors_limit_sensor_pressed block="on crash sensor |%port| pressed"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=4
    //% weight=114
    //% group="Digital"
    export function onLimitSensorPressed(port: Controller.DigitalPort, body: Action) {
        let pin: DigitalPin = Controller.toDigitalPin(port);
        pins.setEvents(pin, PinEventType.Edge);
        control.onEvent(Controller.toEventSource(pin), EventBusValue.MICROBIT_PIN_EVT_RISE, body);
    }

    /**
     * Get the crash sensor state (pressed or not).
     * @param port microbit didgital port
     */
    //% blockId=sensors_is_limit_sensor_pressed block="cratch sensor |%port| pressed"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=4
    //% weight=118
    //% group="Digital"
    export function isLimitSensorPressed(port: Controller.DigitalPort): boolean {
        let pin: DigitalPin = Controller.toDigitalPin(port);
        return (pins.digitalReadPin(pin) == 1) ? true : false;
    }

    /**
     * Do something when motion is detected by a PIR sensor.
     * @param port microbit digital pin
     * @param body code to run when event is raised
     */
    //% blockId=sensors_human_body_nearby block="on pir sensor |%port| detected motion"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=4
    //% weight=113
    //% group="Digital"
    export function onHumanBodyDetected(port: Controller.DigitalPort, body: Action) {
        let pin: DigitalPin = Controller.toDigitalPin(port);
        pins.setEvents(pin, PinEventType.Edge);
        control.onEvent(Controller.toEventSource(pin), EventBusValue.MICROBIT_PIN_EVT_RISE, body);
    }

    /**
     * Get the pir sensor state.
     * @param port microbit didgital port
     */
    //% blockId=sensors_is_humon_body_detected block="pir sensor |%port| detected motion"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=4
    //% weight=117
    //% group="Digital"
    export function isHumanBodyDetected(port: Controller.DigitalPort): boolean {
        let pin: DigitalPin = Controller.toDigitalPin(port);
        return (pins.digitalReadPin(pin) == 1) ? true : false;
    }

    export enum GestureType {
        //% block=None enumval=0
        None,
        //% block=Right enumval=1
        Right,
        //% block=Left enumval=2
        Left,
        //% block=Up enumval=3
        Up,
        //% block=Down enumval=4
        Down,
        //% block=Forward enumval=5
        Forward,
        //% block=Backward enumval=6
        Backward,
        //% block=Clockwise enumval=7
        Clockwise,
        //% block=Anticlockwise enumval=8
        Anticlockwise,
        //% block=Wave enumval=9
        Wave
    }

    const GESTURE_EVENT_ID = 3100;
    let lastGesture: GestureType = GestureType.None;

    /**
     * Get the current gesture.
     */
    //% blockId=sensors_get_gesture block="gesture sensor(iic) type"
    //% weight=114
    //% group="IIC"
    export function currGesture(): GestureType {
        let data = 0, result = 0;
        data = paj7260.read();
        switch (data) {
            case 0x01: result = GestureType.Right; break;
            case 0x02: result = GestureType.Left; break;
            case 0x04: result = GestureType.Up; break;
            case 0x08: result = GestureType.Down; break;
            case 0x10: result = GestureType.Forward; break;
            case 0x20: result = GestureType.Backward; break;
            case 0x40: result = GestureType.Clockwise; break;
            case 0x80: result = GestureType.Anticlockwise; break;
        }
        return result;
    }

    /**
     * Do something a new gesture is detected by gesture sensor.
     * @param ges microbit digital pin
     * @param body code to run when event is raised
     */
    //% blockId=sensors_gesture_changed block="on gesture |%ges|"
    //% ges.fieldEditor="gridpicker" ges.fieldOptions.columns=3
    //% weight=113
    //% group="IIC"
    export function onGesture(ges: GestureType, body: Action) {
        control.onEvent(GESTURE_EVENT_ID, ges, body);
        control.inBackground(() => {
            while (true) {
                let g: GestureType = currGesture();
                if (g != lastGesture) {
                    lastGesture = g;
                    if (g == ges)
                        control.raiseEvent(GESTURE_EVENT_ID, g);
                }
                basic.pause(50);
            }
        })
    }
}