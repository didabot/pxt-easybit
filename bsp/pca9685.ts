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