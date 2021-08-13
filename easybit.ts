
namespace PCA9685_Drive {
    // definitions for PCA9685 chip
    let initialized = false
    const PCA9685_ADDRESS = 0x40
    const MODE1 = 0x00
    const MODE2 = 0x01
    const SUBADR1 = 0x02
    const SUBADR2 = 0x03
    const SUBADR3 = 0x04
    const PRESCALE = 0xFE
    const LED0_ON_L = 0x06
    const LED0_ON_H = 0x07
    const LED0_OFF_L = 0x08
    const LED0_OFF_H = 0x09
    const ALL_LED_ON_L = 0xFA
    const ALL_LED_ON_H = 0xFB
    const ALL_LED_OFF_L = 0xFC
    const ALL_LED_OFF_H = 0xFD

    export function initPCA9685(): void {
        if (!initialized) {
            Easybit.i2cwrite(PCA9685_ADDRESS, MODE1, 0x00);
            setFreq(50); //1s / 20ms
            initialized = true;
        }
    }

    export function setFreq(freq: number): void {
        // Constrain the frequency
        let prescaleval = 25000000;
        prescaleval /= 4096;
        prescaleval /= freq;
        //prescaleval = prescaleval * 25 / 24;  // 0.915
        prescaleval -= 1;
        let prescale = prescaleval; //Math.Floor(prescaleval + 0.5);
        //Easybit.i2cwrite(PCA9685_ADDRESS, MODE1, 0x00);
        let oldmode = Easybit.i2cread(PCA9685_ADDRESS, MODE1);
        let newmode = (oldmode & 0x7F) | 0x10;// sleep
        Easybit.i2cwrite(PCA9685_ADDRESS, MODE1, newmode); // go to sleep
        Easybit.i2cwrite(PCA9685_ADDRESS, PRESCALE, prescale); // set the prescaler
        Easybit.i2cwrite(PCA9685_ADDRESS, MODE1, oldmode);
        control.waitMicros(5000);
        Easybit.i2cwrite(PCA9685_ADDRESS, MODE1, oldmode | 0xa1);  //1010 0001
    }

    export function setPwm(channel: number, on: number, off: number): void {
        if (channel < 0 || channel > 15)
            return;

         PCA9685_Drive.initPCA9685();
        let buf = pins.createBuffer(5);
        buf[0] = LED0_ON_L + 4 * channel;
        buf[1] = on & 0xff;
        buf[2] = (on >> 8) & 0xff;
        buf[3] = off & 0xff;
        buf[4] = (off >> 8) & 0xff;
        pins.i2cWriteBuffer(PCA9685_ADDRESS, buf);
    }
}

//% color=#009ede icon="\uf2db"
namespace Easybit {
    export enum Servo {
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

    export enum Motor {
        //% block="M1"
        M1 = 0,        
        //% block="M2"
        M2 = 2,        
        //% block="M3"
        M3 = 4,        
        //% block="M4"
        M4 = 6,        
    }

    export enum LED {
        //% block="LED1"
        LED1,
        //% block="LED2"
        LED2,
        //% block="LED3"
        LED3,
        //% block="LED4"
        LED4
    }

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

    export enum DigitalPort {
        //% block=P0
        P0,
        //% block=P1
        P1,
        //% block=P2
        P2,
        //% block=P3       
        P3,
        //% block=P4
        P4,
        //% block=P10
        P10
    }

    export enum AnalogPort {
        //% block=P0
        P0,
        //% block=P1
        P1,
        //% block=P2
        P2,
        //% block=P3       
        P3,
        //% block=P4
        P4,
        //% block=P10
        P10
    }

    export enum MultiPort {
        //% block=IIC
        IIC,
        //% block=UART
        UART
    }

    export const serialTxPin: SerialPin = SerialPin.P15;
    export const serialRxPin: SerialPin = SerialPin.P14;

    export function toDigitalPin(port: DigitalPort): DigitalPin {
        let pin: DigitalPin;
        switch (port) {
            case DigitalPort.P0: pin = DigitalPin.P0; break;
            case DigitalPort.P1: pin = DigitalPin.P1; break;
            case DigitalPort.P2: pin = DigitalPin.P2; break;
            case DigitalPort.P3: pin = DigitalPin.P3; break;
            case DigitalPort.P4: pin = DigitalPin.P4; break;
            case DigitalPort.P10: pin = DigitalPin.P10; break;
        }

        return pin;
    }

    export function digitalPortHold(port: DigitalPort) {
        /*
        switch (port) {
            case DigitalPort.P3: 
            case DigitalPort.P4: 
            case DigitalPort.P10:
                led.enable(false);
            break;
        }*/
    }

    export function digitalPortRelease(port: DigitalPort) {
        /*
        switch (port) {
            case DigitalPort.P3: 
            case DigitalPort.P4: 
            case DigitalPort.P10:
                led.enable(true);
            break;
        }*/
    }

    export function toAnalogPin(port: AnalogPort): AnalogPin {
        let pin: AnalogPin;
        switch (port) {
            case AnalogPort.P0: pin = AnalogPin.P0; break;
            case AnalogPort.P1: pin = AnalogPin.P1; break;
            case AnalogPort.P2: pin = AnalogPin.P2; break;
            case AnalogPort.P3: pin = AnalogPin.P3; break;
            case AnalogPort.P4: pin = AnalogPin.P4; break;
            case AnalogPort.P10: pin = AnalogPin.P10; break;
        }

        return pin;
    }

    export function analogPortHold(port: AnalogPort) {
        switch (port) {
            case AnalogPort.P3: 
            case AnalogPort.P4: 
            case AnalogPort.P10:
                led.enable(false);
            break;
        }
    }

    export function analogPortRelease(port: AnalogPort) {
        switch (port) {
            case AnalogPort.P3: 
            case AnalogPort.P4: 
            case AnalogPort.P10:
                led.enable(true);
            break;
        }
    }

    export function toEventSource(port: DigitalPort): EventBusSource {
        let src: EventBusSource;
        switch (port) {
            case DigitalPort.P0: src = EventBusSource.MICROBIT_ID_IO_P0; break;
            case DigitalPort.P1: src = EventBusSource.MICROBIT_ID_IO_P1; break;
            case DigitalPort.P2: src = EventBusSource.MICROBIT_ID_IO_P2; break;
            case DigitalPort.P3: src = EventBusSource.MICROBIT_ID_IO_P3; break;
            case DigitalPort.P4: src = EventBusSource.MICROBIT_ID_IO_P4; break;
            case DigitalPort.P10: src = EventBusSource.MICROBIT_ID_IO_P10; break;
        }

        return src;
    }

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


    /**
     * set servo angle
     * @param degree 0~180 degree of servo; eg: 0, 30, 109
    */
    //% blockId=Easybit_set_servo_angle block="set servo |%servoId| angle(0~180) |%degree| degree"
    //% weight=130
    //% degree.min=0 degree.max=180
    //% degree.shadow="protractorPicker"
    export function SetServoAngle(servoId: Servo, degree: number = 0): void {
        // 50hz: 20,000 us
        let v_us = (degree * 1800 / 180 + 600); // 0.6 ~ 2.4
        let value = v_us * 4096 / 20000;
        PCA9685_Drive.setPwm(servoId, 0, value);
    }

    /**
	 * start motor
	*/
    //% blockId=Easybit_start_motor block="start motor |%w| speed(-100~+100) |%speed|" blockGap=8
    //% weight=120
    //% speed.min=-100 speed.max=100
    export function StartMotor(m: Motor, speed: number): void {
        PCA9685_Drive.initPCA9685();
        speed = speed * 40.96; // scaling 100 to 4096 
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
	 * stop motor
	*/
    //% blockId=Easybit_stop_motor block="stop motor |%m|" blockGap=8
    //% weight=110
    export function StopMotor(m: Motor) {
        StartMotor(m, 0);
    }

    /**
	 * stop all motors
	*/
    //% blockId=Easybit_stop_all_motors block="stop all motors" blockGap=8
    //% weight=100
    export function StopAllMotors() {
        StartMotor(Motor.M1, 0);
        StartMotor(Motor.M2, 0);
        StartMotor(Motor.M3, 0);
        StartMotor(Motor.M4, 0);
    }

    let neoStrip: neopixel.Strip = neopixel.create(DigitalPin.P8, 4, NeoPixelMode.RGB);
    neoStrip.setBrightness(75);

    /**
     * set led color to a predefined color. 
    */
    //% blockId="Easybit_set_led_color" block="set |%led| color |%color|"
    //% weight=90
    export function setLedColor(led: LED, color: Colors): void {
        neoStrip.setPixelColor(led, color);
        neoStrip.show();
    }

    /**
     * set all leds color to a predefined color. 
    */
    //% blockId="Easybit_set_all_leds_color" block="set all led colors |%color|"
    //% weight=80
    export function setAllLedColor(color: Colors): void {
        neoStrip.setPixelColor(LED.LED1, color);
        neoStrip.setPixelColor(LED.LED2, color);
        neoStrip.setPixelColor(LED.LED3, color);
        neoStrip.setPixelColor(LED.LED4, color);
        neoStrip.show();
    }

    /**
     * set led color to a given rgb value. 
    */
    //% blockId="Easybit_set_led_rgb" block="set |%led| color red |%red| green |%green| blue |%blue|"
    //% weight=70
    //% red.min=0 red.max=255
    //% green.min=0 green.max=255
    //% blue.min=0 blue.max=255
    export function setLedRGB(led: LED, red: number, green: number, blue: number): void {
        neoStrip.setPixelColor(led, packRGB(red, green, blue));
        neoStrip.show();
    }

    /**
     * set all leds color to a given rgb value. 
    */
    //% blockId="Easybit_set_all_leds_rgb" block="set all leds color red |%red| green |%green| blue |%blue|"
    //% weight=60
    //% red.min=0 red.max=255
    //% green.min=0 green.max=255
    //% blue.min=0 blue.max=255
    export function setAllLedRGB(red: number, green: number, blue: number): void {
        let rgb = packRGB(red, green, blue);
        neoStrip.setPixelColor(LED.LED1, rgb);
        neoStrip.setPixelColor(LED.LED2, rgb);
        neoStrip.setPixelColor(LED.LED3, rgb);
        neoStrip.setPixelColor(LED.LED4, rgb);
        neoStrip.show();
    }

    function packRGB(a: number, b: number, c: number): number {
        return ((a & 0xFF) << 16) | ((b & 0xFF) << 8) | (c & 0xFF);
    }

    /**
     * turn off all LEDs. 
    */
    //% blockId="Easybit_clear_all_leds" block="clear all leds"
    //% weight=50
    export function clearAllLeds(): void {
        neoStrip.clear();
        neoStrip.show();
    }

    /**
     * set brightness. 
     * @param level brightness level 0-100
    */
    //% blockId="Easybit_set_led_brightness" block="set led brightness(0~100)|%level|"
    //% weight=50
    //% level.min=0 level.max=100
    export function setLedsBrightness(level : number): void {
        neoStrip.setBrightness(pins.map(level, 0, 100, 0, 255));
        neoStrip.show();
    }
}
