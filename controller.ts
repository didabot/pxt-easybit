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

    /**
     * config microbit led screen to enable/disable pins used by led screen.
     * @param state on/off
    */
    //% blockId=controller_config_led_screen block="set microbit led screen |%state|"
    //% weight=130
    //% state.shadow="toggleOnOff"
    export function SetLedScreen(state: State = State.ON): void {
        if (state == State.ON)
            led.enable(true)
        else
            led.enable(false)
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
     * set servo angle
     * @param degree 0~180 degree of servo; eg: 0, 30, 109
    */
    //% blockId=octopus_set_servo_angle block="set servo |%servoId| angle |%degree|"
    //% weight=130
    //% degree.min=0 degree.max=180
    //% degree.shadow="protractorPicker"
    //% subcategory=Octopus group="Servo"
    export function OctopusSetServoAngle(servoId: OctopusServo, degree: number = 0): void {
        // 50hz: 20,000 us
        let v_us = (degree * 1800 / 180 + 600); // 0.6 ~ 2.4
        let value = v_us * 4096 / 20000;
        PCA9685_Drive.setPwm(servoId, 0, value);
    }

    /**
	 * run motor
	*/
    //% blockId=octopus_run_motor block="run motor |%w| speed |%speed|"
    //% weight=120
    //% speed.min=-255 speed.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
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
	 * run motor for a duration
	*/
    //% blockId=octopus_run_motor_duration block="run motor |%w| speed |%speed| duration |%duration|ms"
    //% weight=120
    //% speed.min=-255 speed.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% subcategory=Octopus group="Motor"
    export function OctopusRunMotorDuration(m: OctopusMotor, speed: number, duration: number): void {
        OctopusRunMotor(m, speed)
        basic.pause(duration)
        OctopusRunMotor(m, 0)
    }

    /**
	 * stop motor
	*/
    //% blockId=octopus_stop_motor block="stop motor |%m|"
    //% weight=110
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% subcategory=Octopus group="Motor"
    export function OctopusStopMotor(m: OctopusMotor) {
        OctopusRunMotor(m, 0);
    }

    /**
	 * stop all motors
	*/
    //% blockId=Octopus_stop_all_motors block="stop all motors"
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
     * set led color to a predefined color. 
    */
    //% blockId="octopus_set_led_color" block="set |%led| color |%color|"
    //% weight=90
    //% subcategory=Octopus group="RGB"
    export function OctopusSetLedColor(led: OctopusLED, color: Colors): void {
        OctopusCreateRGB();
        octopusNeoStrip.setPixelColor(led, color);
        octopusNeoStrip.show();
    }

    /**
     * set led color to a given rgb value. 
    */
    //% blockId="octopus_set_led_value" block="set %led rgb value |red %red|green %green|blue %blue"
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
     * clear all LEDs. 
    */
    //% blockId="octopus_clear_all_leds" block="clear all leds"
    //% weight=50
    //% subcategory=Octopus group="RGB"
    export function OctopusClearAllLeds(): void {
        OctopusCreateRGB();
        octopusNeoStrip.clear();
        octopusNeoStrip.show();
    }

    /**
     * set brightness. 
     * @param level brightness level 0-100
    */
    //% blockId="octopus_set_led_brightness" block="set led brightness|%level|"
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
     * set servo angle
     * @param degree 0~180 degree of servo; eg: 0, 30, 109
    */
    //% blockId=turtle_set_servo_angle block="set servo |%servoId| angle |%degree|"
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
     * set led color to a predefined color. 
    */
    //% blockId="turtle_set_led_color" block="set |%led| color |%color|"
    //% weight=90
    //% subcategory=Turtle group="RGB"
    export function TurtleSetLedColor(led: TurtleLED, color: Colors): void {
        TurtleCreateRGB();
        turtleNeoStrip.setPixelColor(led, color);
        turtleNeoStrip.show();
    }

    /**
     * set led color to a given rgb value. 
    */
    //% blockId="turtle_set_led_value" block="set %led rgb value |red %red|green %green|blue %blue"
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
     * clear all LEDs. 
    */
    //% blockId="turtle_clear_all_leds" block="clear all leds"
    //% weight=50
    //% subcategory=Turtle group="RGB"
    export function TurtleClearAllLeds(): void {
        TurtleCreateRGB();
        turtleNeoStrip.clear();
        turtleNeoStrip.show();
    }

    /**
     * set brightness. 
     * @param level brightness level 0-100
    */
    //% blockId="octopus_set_led_brightness" block="set led brightness|%level|"
    //% weight=50
    //% level.min=0 level.max=255
    //% subcategory=Turtle group="RGB"
    export function TurtleSetLedBrightness(level : number): void {
        OctopusCreateRGB();
        turtleNeoStrip.setBrightness(level);
        turtleNeoStrip.show();
    }

}