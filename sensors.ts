//% color=#009ede icon="\uf2c9"
namespace Sensors {
    /**
     * Get the sound level.
     * @param port easybit port to be connected to
     */
    //% blockId=easybit_get_sound_level block="sound level(0~100) at |%port|"
    //% weight=130
    export function soundLevel(port: Easybit.AnalogPort): number {
        let voltage = 0;
        let level = 0;
        let pin = Easybit.toAnalogPin(port);

        voltage = pins.map(
            pins.analogReadPin(pin),
            0,
            1023,
            0,
            100
        );
 
        level = voltage;
        return Math.round(level);
    }

    /**
     * Get the water level.
     * @param port easybit port to be connected to
     */
    //% blockId=easybit_get_water_level block="water level(0~100) at port |%port|"
    //% weight=129
    export function waterLevel(port: Easybit.AnalogPort): number {
        let pin = Easybit.toAnalogPin(port);
        let level = pins.map(
            pins.analogReadPin(pin),
            0,
            700,
            0,
            100);
        return Math.round(level) ;
    }

    /**
     * Get the soil moisture.
     * @param port easybit port to be connected to
     */
    //% blockId=easybit_get_soil_moisture block="soil mosture(0~100) at port |%port|"
    //% weight=128
    export function soilMoisture(port: Easybit.AnalogPort): number {
        let voltage = 0;
        let soilmoisture = 0;
        let pin = Easybit.toAnalogPin(port);

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
     * @param port easybit port to be connected to
     */
    //% blockId=easybit_get_light_intensity block="light intensity(0~100) at port |%port|"
    //% weight=127
    export function lightIntensity(port: Easybit.AnalogPort): number {
        let voltage = 0;
        let lightintensity = 0;
        let pin = Easybit.toAnalogPin(port);

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
     * Get the rotation angle.
     * @param port easybit port to be connected to
     */
    //% blockId=easybit_get_rotation_angle block="rotation angle(0~280) at port |%port|"
    //% weight=126
    export function rotationAngle(port: Easybit.AnalogPort): number {
        let pin = Easybit.toAnalogPin(port);
        let level = pins.map(
            pins.analogReadPin(pin),
            0,
            1023,
            0,
            280);
        return Math.round(level);
    }

    /**
     * Get the gas intensity.
     * @param port easybit port to be connected to
     */
    //% blockId=easybit_get_gas_intensity block="gas intensity(0~100) at port |%port|"
    //% weight=125
    export function gasIntensity(port: Easybit.AnalogPort): number {
        let pin = Easybit.toAnalogPin(port);
        let level = pins.map(
            pins.analogReadPin(pin),
            0,
            1023,
            0,
            100);
        return Math.round(level);
    }

    /**
     * get environment temperature and humidity value
     * @param port easybit port to be connected to
     * @param src value type */
    //% weight=124
    //% blockId="easybit_get_enviroment_value" block="environment %src| at port |%port|"
    export function environmentValue(port: Easybit.DigitalPort, src: dht11.DataSource): number {
        let pin = Easybit.toDigitalPin(port);
        return dht11.read(src, pin);
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
     * Connect a sonar sensor to easybit and get distance.
     * @param port easybit port connect to
     * @param unit unit expect to display
     */
    //% blockId=easybit_get_sonar_distance block="sonar distance in unit %unit at port %port"
    //% weight=123
    export function sonar(port: Easybit.MultiPort, unit: Unit): number {
        // determine the pin
        let trig: DigitalPin;
        let echo: DigitalPin;

        if (port == Easybit.MultiPort.UART) {
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
     * Get the color data from color sensor.
     * @param color data source to read from
     */
    //% blockId=easybit_read_color_data block="|%color| value at port iic"
    //% weight=122
    export function color(color: Color): number {
        let data: number;
        switch (color) {
            case Color.red: data = cls381.red(); break;
            case Color.green: data = cls381.green(); break;
            case Color.blue: data = cls381.blue(); break;
        }
        return data;
    }

    /**
     * Connect a line tracker to easybit and do something when line detected.
     * @param port easybit port to be connected to
     * @param body code to run when event is raised
     */
    //% blockId=easybit_line_detected block="on black line detected at port |%port|"
    //% weight=117
    export function onLineDetected(port: Easybit.DigitalPort, body: Action) {
        let pin = Easybit.toDigitalPin(port);
        pins.setEvents(pin, PinEventType.Edge);

        let func = () => {
            body();
        } 

        control.onEvent(Easybit.toEventSource(port), EventBusValue.MICROBIT_PIN_EVT_RISE, func);
    }

    /**
     * Get the line tracker state.
     * @param port easybit port to be connected to
     */
    //% blockId=easybit_is_line_detected block="black line detected at port |%port| "
    //% weight=121
    export function lineDetected(port: Easybit.DigitalPort): boolean {
        let pin = Easybit.toDigitalPin(port);
        let state = pins.digitalReadPin(pin);           
        return (state == 1) ? true : false;
    }

    /**
     * Connect a hall sensor to easybit and do something when magnet detected.
     * @param port easybit port to be connected to
     * @param body code to run when event is raised
     */
    //% blockId=easybit_magnet_detected block="on magnet detected at port |%port|"
    //% weight=116
    export function onMagnetDetected(port: Easybit.DigitalPort, body: Action) {
        let pin = Easybit.toDigitalPin(port);
        pins.setEvents(pin, PinEventType.Edge);

        let func = () => {
            body();
        } 

        control.onEvent(Easybit.toEventSource(port), EventBusValue.MICROBIT_PIN_EVT_FALL, func);
   }

    /**
     * Get the hall sensor state.
     * @param port easybit port to be connected to
     */
    //% blockId=easybit_is_magnet_detected block="magnet detected at port |%port|"
    //% weight=120
    export function magnetDetected(port: Easybit.DigitalPort): boolean {
        let pin = Easybit.toDigitalPin(port);
        let state = pins.digitalReadPin(pin);           
        return (state == 0) ? true : false;
    }

    /**
     * Connect a vibration sensor to easybit and do something when vibration detected.
     * @param port easybit port to be connected to
     * @param body code to run when event is raised
     */
    //% blockId=easybit_on_vibration_happened block="on vibration at port |%port|"
    //% weight=115
    export function onVibration(port: Easybit.DigitalPort, body: Action) {
        let pin = Easybit.toDigitalPin(port);
        pins.setEvents(pin, PinEventType.Edge);

        let func = () => {
            body();
        } 

        control.onEvent(Easybit.toEventSource(port), EventBusValue.MICROBIT_PIN_EVT_FALL, func);
    }

    /**
     * Get the vibration state.
     * @param port easybit port to be connected to
     */
    //% blockId=easybit_is_vibration_happened block="vibration happened at port |%port| "
    //% weight=119
    export function vibrationHappened(port: Easybit.DigitalPort): boolean {
        let pin = Easybit.toDigitalPin(port);
        let state = pins.digitalReadPin(pin);           
        return (state == 1) ? true : false;
    }

    /**
     * Connect a limit sensor to Easybit and do something when pushed down.
     * @param port Easybit port to be connected to
     * @param body code to run when event is raised
     */
    //% blockId=Easybit_limit_sensor_pressed block="on limit position reached at port |%port| "
    //% weight=114
    export function onLimitSensorPressed(port: Easybit.DigitalPort, body: Action) {
        let pin = Easybit.toDigitalPin(port);
        pins.setEvents(pin, PinEventType.Edge);

        let func = () => {
            body();
        } 

        control.onEvent(Easybit.toEventSource(port), EventBusValue.MICROBIT_PIN_EVT_RISE, func);
    }

    /**
     * Get the limit sensor state (pressed or not).
     * @param port Easybit port to be connected to
     */
    //% blockId=Easybit_is_limit_sensor_pressed block="limit position reached at port |%port|"
    //% weight=118
    export function isLimitSensorPressed(port: Easybit.DigitalPort): boolean {
        let pin = Easybit.toDigitalPin(port);
        let state = pins.digitalReadPin(pin);  
        return (state == 1) ? true : false;
    }

    /**
     * Connect a pir sensor to Easybit and do something when humanbody detected.
     * @param port Easybit port to be connected to
     * @param body code to run when event is raised
     */
    //% blockId=Easybit_human_body_nearby block="on humanbody moved at port |%port|"
    //% weight=113
    export function onHumanBodyDetected(port: Easybit.DigitalPort, body: Action) {
        let pin = Easybit.toDigitalPin(port);
        pins.setEvents(pin, PinEventType.Edge);

        let func = () => {
            body();
        } 

        control.onEvent(Easybit.toEventSource(port), EventBusValue.MICROBIT_PIN_EVT_RISE, func);
    }

    /**
     * Get the pir sensor state.
     * @param port Easybit port to be connected to
     */
    //% blockId=Easybit_is_humon_body_detected block="humanbody moved at port |%port|"
    //% weight=117
    export function isHumanBodyDetected(port: Easybit.DigitalPort): boolean {
        let pin = Easybit.toDigitalPin(port);
        let state = pins.digitalReadPin(pin);  
        return (state == 1) ? true : false;
    }

    export enum Gesture {
        //% block="None"
        None = 0,
        //% block="Right"
        Right = 1,
        //% block="Left"
        Left = 2,
        //% block="Up"
        Up = 3,
        //% block="Down"
        Down = 4,
        //% block="Forward"
        Forward = 5,
        //% block="Backward"
        Backward = 6,
        //% block="Clockwise"
        Clockwise = 7,
        //% block="Anticlockwise"
        Anticlockwise = 8,
        //% block="Wave"
        Wave = 9
    }

    const GESTURE_EVENT_ID = 3100;
    let lastGesture: Gesture = Gesture.None;

    /**
     * Get the current gesture.
     */
    //% blockId=Easybit_get_gesture block="gesture type at port IIC"
    //% weight=114
    export function gesture(): Gesture {
        let data = 0, result = 0;
        data = paj7260.read();
        switch (data) {
            case 0x01: result = Gesture.Right; break;
            case 0x02: result = Gesture.Left; break;
            case 0x04: result = Gesture.Up; break;
            case 0x08: result = Gesture.Down; break;
            case 0x10: result = Gesture.Forward; break;
            case 0x20: result = Gesture.Backward; break;
            case 0x40: result = Gesture.Clockwise; break;
            case 0x80: result = Gesture.Anticlockwise; break;
        }
        return result;
    }

    /**
     * Connect a gesture sensor to Easybit and do something when gesture changed.
     * @param body code to run when event is raised
     */
    //% blockId=Easybit_gesture_changed block="on gesture |%ges|"
    //% weight=113
    export function onGesture(ges: Gesture, body: Action) {
        control.onEvent(GESTURE_EVENT_ID, ges, body);
        control.inBackground(() => {
            while (true) {
                const ges = gesture();
                if (ges != lastGesture) {
                    lastGesture = ges;
                    control.raiseEvent(GESTURE_EVENT_ID, lastGesture);
                }
                basic.pause(50);
            }
        })
    }
}