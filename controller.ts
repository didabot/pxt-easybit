//% color=#1D78FE icon="\uf11b"
//% groups='["Servo","Motor","RGB"]'
namespace Controller {
    ///////////////////////////////////////Common Definition/////////////////////////////////////////////////////////////////
    export enum Colors {
        //% block=red
        Red = 0xFF0000,
        //% block=orange
        Orange = 0xFFA500,
        //% block=yellow
        Yellow = 0xFFFF00,
        //% block=green
        Green = 0x00FF00,
        //% block=blue
        Blue = 0x0000FF,
        //% block=indigo
        Indigo = 0x4b0082,
        //% block=violet
        Violet = 0x8a2be2,
        //% block=purple
        Purple = 0xFF00FF,
        //% block=white
        White = 0xFFFFFF,
        //% block=black
        Black = 0x000000
    }

    export enum State {
        //% block=OFF
        OFF = 0,
        //% block=ON
        ON = 1
    }

    export enum AnalogInputPort {
        P0,
        P1,
        P2,
        P3,
        P4,
        P10
    }

    export enum AnalogOutPutPort {
        P0,
        P1,
        P2,
        P3,
        P4,
        P6,
        P7,
        P8,
        P9,
        P10,
        P12,
        P13,
        P14,
        P15,
        P16
    }

    export enum DigitalPort {
        P0,
        P1,
        P2,
        P3,
        P4,
        P6,
        P7,
        P8,
        P9,
        P10,
        P12,
        P13,
        P14,
        P15,
        P16
    }

    export enum SmartPort {
        IIC,
        UART
    }

    function ledScreenEnableDigitalPin(pin: DigitalPin): void {
        switch (pin) {
            case DigitalPin.P3:
            case DigitalPin.P4:
            case DigitalPin.P6:
            case DigitalPin.P7:
            case DigitalPin.P9:
            case DigitalPin.P10: led.enable(false); break;
        }
    }

    function ledScreenEnableAnalogPin(pin: AnalogPin): void {
        switch (pin) {
            case AnalogPin.P3:
            case AnalogPin.P4:
            case AnalogPin.P6:
            case AnalogPin.P7:
            case AnalogPin.P9:
            case AnalogPin.P10: led.enable(false); break;
        }
    }

    export function toAnalogInputPin(ai: AnalogInputPort): AnalogPin {
        let pin: AnalogPin;
        switch (ai) {
            case AnalogInputPort.P0: pin = AnalogPin.P0; break;
            case AnalogInputPort.P1: pin = AnalogPin.P1; break;
            case AnalogInputPort.P2: pin = AnalogPin.P2; break;
            case AnalogInputPort.P3: pin = AnalogPin.P3; break;
            case AnalogInputPort.P4: pin = AnalogPin.P4; break;
            case AnalogInputPort.P10: pin = AnalogPin.P10; break;
        }

        ledScreenEnableAnalogPin(pin);
        return pin;
    }

    export function toAnalogOutputPin(ao: AnalogOutPutPort): AnalogPin {
        let pin: AnalogPin;
        switch (ao) {
            case AnalogOutPutPort.P0: pin = AnalogPin.P0; break;
            case AnalogOutPutPort.P1: pin = AnalogPin.P1; break;
            case AnalogOutPutPort.P2: pin = AnalogPin.P2; break;
            case AnalogOutPutPort.P3: pin = AnalogPin.P3; break;
            case AnalogOutPutPort.P4: pin = AnalogPin.P4; break;
            case AnalogOutPutPort.P10: pin = AnalogPin.P10; break;
            case AnalogOutPutPort.P6: pin = AnalogPin.P6; break;
            case AnalogOutPutPort.P7: pin = AnalogPin.P7; break;
            case AnalogOutPutPort.P8: pin = AnalogPin.P8; break;
            case AnalogOutPutPort.P9: pin = AnalogPin.P9; break;
            case AnalogOutPutPort.P12: pin = AnalogPin.P12; break;
            case AnalogOutPutPort.P13: pin = AnalogPin.P13; break;
            case AnalogOutPutPort.P14: pin = AnalogPin.P14; break;
            case AnalogOutPutPort.P15: pin = AnalogPin.P15; break;
            case AnalogOutPutPort.P16: pin = AnalogPin.P16; break;
        }
        ledScreenEnableAnalogPin(pin);
        return pin;
    }

    export function toDigitalPin(dio: DigitalPort): DigitalPin {
        let pin: DigitalPin;
        switch (dio) {
            case DigitalPort.P0: pin = DigitalPin.P0; break;
            case DigitalPort.P1: pin = DigitalPin.P1; break;
            case DigitalPort.P2: pin = DigitalPin.P2; break;
            case DigitalPort.P3: pin = DigitalPin.P3; break;
            case DigitalPort.P4: pin = DigitalPin.P4; break;
            case DigitalPort.P6: pin = DigitalPin.P6; break;
            case DigitalPort.P7: pin = DigitalPin.P7; break;
            case DigitalPort.P8: pin = DigitalPin.P8; break;
            case DigitalPort.P9: pin = DigitalPin.P9; break;
            case DigitalPort.P10: pin = DigitalPin.P10; break;
            case DigitalPort.P12: pin = DigitalPin.P12; break;
            case DigitalPort.P13: pin = DigitalPin.P13; break;
            case DigitalPort.P14: pin = DigitalPin.P14; break;
            case DigitalPort.P15: pin = DigitalPin.P15; break;
            case DigitalPort.P16: pin = DigitalPin.P16; break;
        }

        ledScreenEnableDigitalPin(pin);
        return pin;
    }

    export function toEventSource(pin: DigitalPin): EventBusSource {
        let src: EventBusSource;
        switch (pin) {
            case DigitalPin.P0: src = EventBusSource.MICROBIT_ID_IO_P0; break;
            case DigitalPin.P1: src = EventBusSource.MICROBIT_ID_IO_P1; break;
            case DigitalPin.P2: src = EventBusSource.MICROBIT_ID_IO_P2; break;
            case DigitalPin.P3: src = EventBusSource.MICROBIT_ID_IO_P3; break;
            case DigitalPin.P4: src = EventBusSource.MICROBIT_ID_IO_P4; break;
            case DigitalPin.P6: src = EventBusSource.MICROBIT_ID_IO_P6; break;
            case DigitalPin.P7: src = EventBusSource.MICROBIT_ID_IO_P7; break;
            case DigitalPin.P8: src = EventBusSource.MICROBIT_ID_IO_P8; break;
            case DigitalPin.P9: src = EventBusSource.MICROBIT_ID_IO_P9; break;
            case DigitalPin.P10: src = EventBusSource.MICROBIT_ID_IO_P10; break;
            case DigitalPin.P12: src = EventBusSource.MICROBIT_ID_IO_P12; break;
            case DigitalPin.P13: src = EventBusSource.MICROBIT_ID_IO_P13; break;
            case DigitalPin.P14: src = EventBusSource.MICROBIT_ID_IO_P14; break;
            case DigitalPin.P15: src = EventBusSource.MICROBIT_ID_IO_P15; break;
            case DigitalPin.P16: src = EventBusSource.MICROBIT_ID_IO_P16; break;
        }

        return src;
    }

    export const serialTxPin: SerialPin = SerialPin.P14;
    export const serialRxPin: SerialPin = SerialPin.P15;

    export function i2cwrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = value;
        pins.i2cWriteBuffer(addr, buf);
    }

    export function i2cread(addr: number, reg: number) {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }

    export function i2ccmd(addr: number, value: number) {
        let buf = pins.createBuffer(1);
        buf[0] = value;
        pins.i2cWriteBuffer(addr, buf);
    }
    
    ///////////////////////////////////////Octopus Controller/////////////////////////////////////////////////////////////////
    let octopusNeoStrip: neopixel.Strip = null;
    export enum OctopusServo {
        //% block="S1"
        S1 = 8,        
        //% block="S2"
        S2 = 9,        
        //% block="S3"
        S3 = 10,        
        //% block="S4"
        S4 = 11,        
        //% block="S5"
        S5 = 12,        
        //% block="S6"
        S6 = 13,        
        //% block="S7"
        S7 = 14,        
        //% block="S8"
        S8 = 15        
    }

    export enum OctopusMotor {
        //% block="M1"
        M1 = 0,        
        //% block="M2"
        M2 = 2,        
        //% block="M3"
        M3 = 4,        
        //% block="M4"
        M4 = 6,        
    }

    export enum OctopusLED {
        //% block="LED1"
        LED1,
        //% block="LED2"
        LED2,
        //% block="LED3"
        LED3,
        //% block="LED4"
        LED4
    }

    /**
     * octopus board set servo target angle.
     * @param servoId servo number, eg: S1, S2
     * @param degree target angle of servo, eg: 0, 30, 109.
    */
    //% blockId=octopus_set_servo_angle block="octopus: servo |%servoId| set angle |%degree|"
    //% weight=130
    //% degree.min=0 degree.max=180
    //% degree.shadow="protractorPicker"
    //% servoId.fieldEditor="gridpicker" servoId.fieldOptions.columns=4
    //% subcategory=Octopus group="Servo"
    export function OctopusSetServoAngle(servoId: OctopusServo, degree: number = 0): void {
        // 50hz: 20,000 us
        let v_us = (degree * 1800 / 180 + 600); // 0.6 ~ 2.4
        let value = v_us * 4096 / 20000;
        PCA9685_Drive.setPwm(servoId, 0, value);
    }

    /**
	 * octopus board run motor with speed.
     * @param m motor number, eg: M1, M2
     * @param speed target speed
	*/
    //% blockId=octopus_run_motor block="octopus: run motor |%m| at speed |%speed|"
    //% weight=120
    //% speed.min=-255 speed.max=255
    //% m.fieldEditor="gridpicker" m.fieldOptions.columns=2
    //% subcategory=Octopus group="Motor"
    export function OctopusRunMotor(m: OctopusMotor, speed: number): void {
        PCA9685_Drive.initPCA9685();
        if (speed != 0) {
            speed = (speed + 1)  * 16 - 1; // scaling 256 to 4096
        }

        if (speed > 4095) {
            speed = 4095;
        }

        if (speed < -4095) {
            speed = -4095;
        }

        if (m > 6 || m < 0)
            return;

        let pp = m;
        let pn = m + 1;

        if (speed >= 0) {
            PCA9685_Drive.setPwm(pp, 0, 0);
            PCA9685_Drive.setPwm(pn, 0, speed);      
        } else {
            PCA9685_Drive.setPwm(pp, 0, -speed);
            PCA9685_Drive.setPwm(pn, 0, 0);       
        }
    }

    /**
	 * octopus board run motor for a duration in milliseconds
     * @param m motor number, eg: M1, M2
     * @param speed target speed
     * @param duration running duration in milliseconds
    */
    //% blockId=octopus_run_motor_duration block="octopus: run motor |%m| speed |%speed| duration |%duration| ms"
    //% weight=120
    //% speed.min=-255 speed.max=255
    //% m.fieldEditor="gridpicker" m.fieldOptions.columns=2
    //% subcategory=Octopus group="Motor"
    export function OctopusRunMotorDuration(m: OctopusMotor, speed: number, duration: number): void {
        OctopusRunMotor(m, speed)
        basic.pause(duration)
        OctopusRunMotor(m, 0)
    }

    /**
	 * octopus board stop motor.
     * @param m motor number, eg: M1, M2
    */
    //% blockId=octopus_stop_motor block="octous: stop motor |%m|"
    //% weight=110
    //% m.fieldEditor="gridpicker" m.fieldOptions.columns=2
    //% subcategory=Octopus group="Motor"
    export function OctopusStopMotor(m: OctopusMotor) {
        OctopusRunMotor(m, 0);
    }

    /**
	 * octopus board stop all motors
	*/
    //% blockId=Octopus_stop_all_motors block="octopus: stop all motors"
    //% weight=100
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% subcategory=Octopus group="Motor"
    export function OctopusStopAllMotors() {
        OctopusRunMotor(OctopusMotor.M1, 0);
        OctopusRunMotor(OctopusMotor.M2, 0);
        OctopusRunMotor(OctopusMotor.M3, 0);
        OctopusRunMotor(OctopusMotor.M4, 0);
    }


    function OctopusCreateRGB(): void {
        if (octopusNeoStrip == null) {
            octopusNeoStrip = neopixel.create(DigitalPin.P8, 4, NeoPixelMode.RGB);
            octopusNeoStrip.setBrightness(75);
            octopusNeoStrip.show()
        }
    }

    function packRGB(a: number, b: number, c: number): number {
        return ((a & 0xFF) << 16) | ((b & 0xFF) << 8) | (c & 0xFF);
    }

    /**
     * set led stardard color mounting on octopus board. 
     * @param led RGB LED number, eg: LED1, LED3
     * @param color color
    */
    //% blockId="octopus_set_led_color" block="octopus: set |%led| color |%color|"
    //% led.fieldEditor="gridpicker" led.fieldOptions.columns=2
    //% weight=90
    //% subcategory=Octopus group="RGB"
    export function OctopusSetLedColor(led: OctopusLED, color: Colors): void {
        OctopusCreateRGB();
        octopusNeoStrip.setPixelColor(led, color);
        octopusNeoStrip.show();
    }

    /**
     * octopus set RGB led color with raw rgb value. 
     * @param led RGB LED number, eg: LED1, LED3
     * @param red red value of RGB
     * @param green green value of RGB
     * @param blue blue value of RGB
    * 
    * 
    */
    //% blockId="octopus_set_led_value" block="octopus: set %led rgb value |R %red|G %green|B %blue"
    //% led.fieldEditor="gridpicker" led.fieldOptions.columns=2
    //% weight=70
    //% red.min=0 red.max=255
    //% green.min=0 green.max=255
    //% blue.min=0 blue.max=255
    //% subcategory=Octopus group="RGB"
    export function OctopusSetLedValue(led: OctopusLED, red: number, green: number, blue: number): void {
        OctopusCreateRGB();
        octopusNeoStrip.setPixelColor(led, packRGB(red, green, blue));
        octopusNeoStrip.show();
    }

    /**
     * octopus board clear all LED. 
    */
    //% blockId="octopus_clear_all_leds" block="octopus: clear all leds"
    //% weight=50
    //% subcategory=Octopus group="RGB"
    export function OctopusClearAllLeds(): void {
        OctopusCreateRGB();
        octopusNeoStrip.clear();
        octopusNeoStrip.show();
    }

    /**
     * octopus board set RGB LED brightness level. 
     * @param level brightness level 0-100
    */
    //% blockId="octopus_set_led_brightness" block="octopus: set led brightness |%level|"
    //% weight=50
    //% level.min=0 level.max=255
    //% subcategory=Octopus group="RGB"
    export function OctopusSetLedBrightness(level : number): void {
        OctopusCreateRGB();
        octopusNeoStrip.setBrightness(level);
        octopusNeoStrip.show();
    }

    ///////////////////////////////////////Turtle/////////////////////////////////////////////////////////////////
    let turtleNeoStrip: neopixel.Strip;
    export enum TurtleServo {
        //% block="S1"
        S1 = 8,        
        //% block="S2"
        S2 = 9,        
        //% block="S3"
        S3 = 10,        
        //% block="S4"
        S4 = 11
    }

    export enum TurtleLED {
        //% block="LED1"
        LED1,
        //% block="LED2"
        LED2
    }
 
    /**
     * turtle board set servo target angle
     * @param servoId servo number, eg: S1, S2
     * @param degree target angle of servo, eg: 0, 30, 109.
    */
    //% blockId=turtle_set_servo_angle block="turtle: servo |%servoId| set angle |%degree|"
    //% servoId.fieldEditor="gridpicker" servoId.fieldOptions.columns=2
    //% weight=130
    //% degree.min=0 degree.max=180
    //% degree.shadow="protractorPicker"
    //% subcategory=Turtle group="Servo"
    export function TurtleSetServoAngle(servoId: TurtleServo, degree: number = 0): void {
        let pin: AnalogPin;
        switch (servoId) {
            case TurtleServo.S1: pin = AnalogPin.P0; break;
            case TurtleServo.S2: pin = AnalogPin.P1; break;
            case TurtleServo.S3: pin = AnalogPin.P2; break;
            case TurtleServo.S4: pin = AnalogPin.P3; break;
        }            
        pins.servoWritePin(pin, degree);
    }

    function TurtleCreateRGB(): void {
        if (turtleNeoStrip == null) {
            turtleNeoStrip = neopixel.create(DigitalPin.P16, 2, NeoPixelMode.RGB);
            turtleNeoStrip.setBrightness(75);
            turtleNeoStrip.show()
        }
    }

    /**
     * set led stardard color mounting on turtle board. 
     * @param led RGB LED number, eg: LED1, LED3
     * @param color color
    */
    //% blockId="turtle_set_led_color" block="turtle: set |%led| color |%color|"
    //% led.fieldEditor="gridpicker" led.fieldOptions.columns=2
    //% weight=90
    //% subcategory=Turtle group="RGB"
    export function TurtleSetLedColor(led: TurtleLED, color: Colors): void {
        TurtleCreateRGB();
        turtleNeoStrip.setPixelColor(led, color);
        turtleNeoStrip.show();
    }

    /**
     * turtle board set RGB led color with raw rgb value. 
     * @param led RGB LED number, eg: LED1, LED3
     * @param red red value of RGB
     * @param green green value of RGB
     * @param blue blue value of RGB
    */
    //% blockId="turtle_set_led_value" block="turtle: set %led rgb value |R %red|G %green|B %blue"
    //% led.fieldEditor="gridpicker" led.fieldOptions.columns=2
    //% weight=70
    //% red.min=0 red.max=255
    //% green.min=0 green.max=255
    //% blue.min=0 blue.max=255
    //% subcategory=Turtle group="RGB"
    export function TurtleSetLedValue(led: OctopusLED, red: number, green: number, blue: number): void {
        TurtleCreateRGB();
        turtleNeoStrip.setPixelColor(led, packRGB(red, green, blue));
        turtleNeoStrip.show();
    }

    /**
     * clear all RGB leds mounting on turtle board. 
    */
    //% blockId="turtle_clear_all_leds" block="turtle: clear all leds"
    //% weight=50
    //% subcategory=Turtle group="RGB"
    export function TurtleClearAllLeds(): void {
        TurtleCreateRGB();
        turtleNeoStrip.clear();
        turtleNeoStrip.show();
    }

    /**
     * set RGB led brightness mounting on turtle board. 
     * @param level brightness level 0-100
    */
    //% blockId="octopus_set_led_brightness" block="turtle: set led brightness|%level|"
    //% weight=50
    //% level.min=0 level.max=255
    //% subcategory=Turtle group="RGB"
    export function TurtleSetLedBrightness(level : number): void {
        OctopusCreateRGB();
        turtleNeoStrip.setBrightness(level);
        turtleNeoStrip.show();
    }

}