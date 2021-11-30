

//% color=#159F03 icon="\uf26c"
//% groups='["Indicator","RGB LED","White LED","Segment Display","OLED Display"]'
namespace Display {
    ///////////////////////////////////////Indicator/////////////////////////////////////////////////////////////////
    export enum State {
        //% block="ON" enumval=0
        ON,
        //% block="OFF" enumval=1
        OFF 
    }

    /**
     * Set indicator state (on or off).
     * @param pin microbit digital pin
     * @param state led state
     */
    //% blockId=display_set_indicator_state block="set indicator |%state| at pin |%port|"
    //% weight=130
    //% group="Indicator"
    export function setIndicatorState(pin: DigitalPin, state: State) {
        if (state == State.ON)
            pins.digitalWritePin(pin, 1);
        else
            pins.digitalWritePin(pin, 0);
    }

    /**
     * Set indicator brightness.
     * @param pin microbit analog pin
     * @param brightness brightness level to set
     */
    //% blockId=display_set_indicator_brightness block="set indicator brightness(0~100) |%brightness| at port |%pin| "
    //% weight=129
    //% brightness.min=0 brightness.max=100    
    //% group="Indicator"
    export function setIndicatorBrightness(pin: AnalogPin, brightness: number) {
        pins.analogWritePin(pin, pins.map(brightness, 0, 100, 0, 1023));
    }

    ///////////////////////////////////////White LED/////////////////////////////////////////////////////////////////
    /**
     * Set white led brightness.
     * @param pin microbit analog pin
     * @param brightness brightness level to set
     */
    //% blockId=display_set_white_led_brightness block="set white led brightness(0~100) |%brightness| at port |%pin| "
    //% weight=129
    //% brightness.min=0 brightness.max=100    
    //% group="White LED"
    export function setWhiteLedBrightness(pin: AnalogPin, brightness: number) {
        pins.analogWritePin(pin, pins.map(brightness, 0, 100, 0, 1023));
    }

    ///////////////////////////////////////RGB LED/////////////////////////////////////////////////////////////////
    let neoStrip:neopixel.Strip  = null;

    /**
     * set rgb led color to a predefined color. 
     * @param pin microbit digital pin
     * @param color color
    */
    //% blockId="display_set_rgb_led_color" block="set rgb led color |%color| at port |%pin| "
    //% weight=129
    //% group="RGB LED"
    export function setRGBLedColor(pin: DigitalPin, color: Controller.Colors): void {
        if (neoStrip == null) {
            neoStrip = neopixel.create(pin, 1, NeoPixelMode.RGB);
            neoStrip.setBrightness(75);
        }
        neoStrip.setPixelColor(0, color);
        neoStrip.show();
    }

    /**
     * set rgb led brightness. 
     * @param pin microbit digital pin
     * @param color color
    */
    //% blockId="display_set_rgb_led_brightness" block="set rgb led brightness |%level| at port |%pin| "
    //% weight=129
    //% level.min=0 level.max=100    
    //% group="RGB LED"
    export function setRGBLedsBrightness(pin: DigitalPin, level: number): void {
        if (neoStrip == null) {
            neoStrip = neopixel.create(pin, 1, NeoPixelMode.RGB);
            neoStrip.setBrightness(75);
        }

        neoStrip.setBrightness(pins.map(level, 0, 100, 0, 255));
        neoStrip.show();
    }

    ////////////////////////////////////////////Segment Display////////////////////////////////////////////////////////////
    /**
     * turn segment display on
     */
    //% blockId=display_turn_segment_display_on block="turn segment display on"
    //% weight=128
    //% group="Segment Display"
    export function digitalTubeOn() {
        tm1650.on();
    }

    /**
     * turn segment display off
     */
    //% blockId=display_turn_segment_display_off block="turn segment display off"
    //% weight=127
    //% group="Segment Display"
    export function digitalTubeOff() {
        tm1650.off();
    }

    /**
     * clear segment display
     */
    //% blockId=display_clear_segment_display block="clear segment display display"
    //% weight=126
    //% group="Segment Display"
    export function digitalTubeClear() {
        tm1650.clear();
    }

    /**
     * set segment display intensity
     */
    //% blockId=display_set_segment_display_intensity block="set segment display intensity |%value|"
    //% weight=125
    //% value.min=0 value.max=8
    //% group="Segment Display"
    export function digitalTubeSetIntensity(value: number) {
        tm1650.setBrightness(value);
    }

    /**
     * show digital at segment display
     * @param value number to be shown on display
     * @param pos position of number
     */
    //% blockId=display_segment_display_show_digit block="show digit |%value| at bit |%pos|"
    //% weight=124
    //% group="Segment Display"
    export function digitalTubeShowDigit(value: number, pos : number) {
        tm1650.showDigit(value, pos);
    }

    /**
     * show number on segment display
     * @param value number to be shown on display
     */
    //% blockId=display_segment_display_show_number block="show number |%value|"
    //% weight=123
    //% group="Segment Display"
    export function digitalTubeShowNumber(value: number) {
        tm1650.showNumber(value);
    }

    /**
     * set dot point state on segment display
     * @param pos bit to show
     * @param show show or not
     */
    //% blockId=display_segment_display_set_dp_state block="show dot at |%pos| |%show|"
    //% weight=122
    //% group="Segment Display"
    export function digitalTubeSetPoint(pos: number, show: boolean) {
        tm1650.showDotPoint(pos, show);
    }

    ////////////////////////////////////////////OLED Display////////////////////////////////////////////////////////////
    let firstoledinit = true
    const basicFont: string[] = [
        "\x00\x00\x00\x00\x00\x00\x00\x00", // " "
        "\x00\x00\x5F\x00\x00\x00\x00\x00", // "!"
        "\x00\x00\x07\x00\x07\x00\x00\x00", // """
        "\x00\x14\x7F\x14\x7F\x14\x00\x00", // "#"
        "\x00\x24\x2A\x7F\x2A\x12\x00\x00", // "$"
        "\x00\x23\x13\x08\x64\x62\x00\x00", // "%"
        "\x00\x36\x49\x55\x22\x50\x00\x00", // "&"
        "\x00\x00\x05\x03\x00\x00\x00\x00", // "'"
        "\x00\x1C\x22\x41\x00\x00\x00\x00", // "("
        "\x00\x41\x22\x1C\x00\x00\x00\x00", // ")"
        "\x00\x08\x2A\x1C\x2A\x08\x00\x00", // "*"
        "\x00\x08\x08\x3E\x08\x08\x00\x00", // "+"
        "\x00\xA0\x60\x00\x00\x00\x00\x00", // ","
        "\x00\x08\x08\x08\x08\x08\x00\x00", // "-"
        "\x00\x60\x60\x00\x00\x00\x00\x00", // "."
        "\x00\x20\x10\x08\x04\x02\x00\x00", // "/"
        "\x00\x3E\x51\x49\x45\x3E\x00\x00", // "0"
        "\x00\x00\x42\x7F\x40\x00\x00\x00", // "1"
        "\x00\x62\x51\x49\x49\x46\x00\x00", // "2"
        "\x00\x22\x41\x49\x49\x36\x00\x00", // "3"
        "\x00\x18\x14\x12\x7F\x10\x00\x00", // "4"
        "\x00\x27\x45\x45\x45\x39\x00\x00", // "5"
        "\x00\x3C\x4A\x49\x49\x30\x00\x00", // "6"
        "\x00\x01\x71\x09\x05\x03\x00\x00", // "7"
        "\x00\x36\x49\x49\x49\x36\x00\x00", // "8"
        "\x00\x06\x49\x49\x29\x1E\x00\x00", // "9"
        "\x00\x00\x36\x36\x00\x00\x00\x00", // ":"
        "\x00\x00\xAC\x6C\x00\x00\x00\x00", // ";"
        "\x00\x08\x14\x22\x41\x00\x00\x00", // "<"
        "\x00\x14\x14\x14\x14\x14\x00\x00", // "="
        "\x00\x41\x22\x14\x08\x00\x00\x00", // ">"
        "\x00\x02\x01\x51\x09\x06\x00\x00", // "?"
        "\x00\x32\x49\x79\x41\x3E\x00\x00", // "@"
        "\x00\x7E\x09\x09\x09\x7E\x00\x00", // "A"
        "\x00\x7F\x49\x49\x49\x36\x00\x00", // "B"
        "\x00\x3E\x41\x41\x41\x22\x00\x00", // "C"
        "\x00\x7F\x41\x41\x22\x1C\x00\x00", // "D"
        "\x00\x7F\x49\x49\x49\x41\x00\x00", // "E"
        "\x00\x7F\x09\x09\x09\x01\x00\x00", // "F"
        "\x00\x3E\x41\x41\x51\x72\x00\x00", // "G"
        "\x00\x7F\x08\x08\x08\x7F\x00\x00", // "H"
        "\x00\x41\x7F\x41\x00\x00\x00\x00", // "I"
        "\x00\x20\x40\x41\x3F\x01\x00\x00", // "J"
        "\x00\x7F\x08\x14\x22\x41\x00\x00", // "K"
        "\x00\x7F\x40\x40\x40\x40\x00\x00", // "L"
        "\x00\x7F\x02\x0C\x02\x7F\x00\x00", // "M"
        "\x00\x7F\x04\x08\x10\x7F\x00\x00", // "N"
        "\x00\x3E\x41\x41\x41\x3E\x00\x00", // "O"
        "\x00\x7F\x09\x09\x09\x06\x00\x00", // "P"
        "\x00\x3E\x41\x51\x21\x5E\x00\x00", // "Q"
        "\x00\x7F\x09\x19\x29\x46\x00\x00", // "R"
        "\x00\x26\x49\x49\x49\x32\x00\x00", // "S"
        "\x00\x01\x01\x7F\x01\x01\x00\x00", // "T"
        "\x00\x3F\x40\x40\x40\x3F\x00\x00", // "U"
        "\x00\x1F\x20\x40\x20\x1F\x00\x00", // "V"
        "\x00\x3F\x40\x38\x40\x3F\x00\x00", // "W"
        "\x00\x63\x14\x08\x14\x63\x00\x00", // "X"
        "\x00\x03\x04\x78\x04\x03\x00\x00", // "Y"
        "\x00\x61\x51\x49\x45\x43\x00\x00", // "Z"
        "\x00\x7F\x41\x41\x00\x00\x00\x00", // """
        "\x00\x02\x04\x08\x10\x20\x00\x00", // "\"
        "\x00\x41\x41\x7F\x00\x00\x00\x00", // """
        "\x00\x04\x02\x01\x02\x04\x00\x00", // "^"
        "\x00\x80\x80\x80\x80\x80\x00\x00", // "_"
        "\x00\x01\x02\x04\x00\x00\x00\x00", // "`"
        "\x00\x20\x54\x54\x54\x78\x00\x00", // "a"
        "\x00\x7F\x48\x44\x44\x38\x00\x00", // "b"
        "\x00\x38\x44\x44\x28\x00\x00\x00", // "c"
        "\x00\x38\x44\x44\x48\x7F\x00\x00", // "d"
        "\x00\x38\x54\x54\x54\x18\x00\x00", // "e"
        "\x00\x08\x7E\x09\x02\x00\x00\x00", // "f"
        "\x00\x18\xA4\xA4\xA4\x7C\x00\x00", // "g"
        "\x00\x7F\x08\x04\x04\x78\x00\x00", // "h"
        "\x00\x00\x7D\x00\x00\x00\x00\x00", // "i"
        "\x00\x80\x84\x7D\x00\x00\x00\x00", // "j"
        "\x00\x7F\x10\x28\x44\x00\x00\x00", // "k"
        "\x00\x41\x7F\x40\x00\x00\x00\x00", // "l"
        "\x00\x7C\x04\x18\x04\x78\x00\x00", // "m"
        "\x00\x7C\x08\x04\x7C\x00\x00\x00", // "n"
        "\x00\x38\x44\x44\x38\x00\x00\x00", // "o"
        "\x00\xFC\x24\x24\x18\x00\x00\x00", // "p"
        "\x00\x18\x24\x24\xFC\x00\x00\x00", // "q"
        "\x00\x00\x7C\x08\x04\x00\x00\x00", // "r"
        "\x00\x48\x54\x54\x24\x00\x00\x00", // "s"
        "\x00\x04\x7F\x44\x00\x00\x00\x00", // "t"
        "\x00\x3C\x40\x40\x7C\x00\x00\x00", // "u"
        "\x00\x1C\x20\x40\x20\x1C\x00\x00", // "v"
        "\x00\x3C\x40\x30\x40\x3C\x00\x00", // "w"
        "\x00\x44\x28\x10\x28\x44\x00\x00", // "x"
        "\x00\x1C\xA0\xA0\x7C\x00\x00\x00", // "y"
        "\x00\x44\x64\x54\x4C\x44\x00\x00", // "z"
        "\x00\x08\x36\x41\x00\x00\x00\x00", // "{"
        "\x00\x00\x7F\x00\x00\x00\x00\x00", // "|"
        "\x00\x41\x36\x08\x00\x00\x00\x00", // "}"
        "\x00\x02\x01\x01\x02\x01\x00\x00"  // "~"
    ];
    function oledcmd(c: number) {
        pins.i2cWriteNumber(0x3c, c, NumberFormat.UInt16BE);
    }
    function writeData(n: number) {
        let b = n;
        if (n < 0) { n = 0 }
        if (n > 255) { n = 255 }
        pins.i2cWriteNumber(0x3c, 0x4000 + b, NumberFormat.UInt16BE);
    }
    function writeCustomChar(c: string) {
        for (let i = 0; i < 8; i++) {
            writeData(c.charCodeAt(i));
        }
    }
    function setText(row: number, column: number) {
        let r = row;
        let c = column;
        if (row < 0) { r = 0 }
        if (column < 0) { c = 0 }
        if (row > 7) { r = 7 }
        if (column > 15) { c = 15 }
        oledcmd(0xB0 + r);            //set page address
        oledcmd(0x00 + (8 * c & 0x0F));  //set column lower address
        oledcmd(0x10 + ((8 * c >> 4) & 0x0F));   //set column higher address
    }
    function putChar(c: string) {
        let c1 = c.charCodeAt(0);
        writeCustomChar(basicFont[c1 - 32]);
    }
    function oledinit(): void {
        oledcmd(0xAE);  // Set display OFF
        oledcmd(0xD5);  // Set Display Clock Divide Ratio / OSC Frequency 0xD4
        oledcmd(0x80);  // Display Clock Divide Ratio / OSC Frequency 
        oledcmd(0xA8);  // Set Multiplex Ratio
        oledcmd(0x3F);  // Multiplex Ratio for 128x64 (64-1)
        oledcmd(0xD3);  // Set Display Offset
        oledcmd(0x00);  // Display Offset
        oledcmd(0x40);  // Set Display Start Line
        oledcmd(0x8D);  // Set Charge Pump
        oledcmd(0x14);  // Charge Pump (0x10 External, 0x14 Internal DC/DC)
        oledcmd(0xA1);  // Set Segment Re-Map
        oledcmd(0xC8);  // Set Com Output Scan Direction
        oledcmd(0xDA);  // Set COM Hardware Configuration
        oledcmd(0x12);  // COM Hardware Configuration
        oledcmd(0x81);  // Set Contrast
        oledcmd(0xCF);  // Contrast
        oledcmd(0xD9);  // Set Pre-Charge Period
        oledcmd(0xF1);  // Set Pre-Charge Period (0x22 External, 0xF1 Internal)
        oledcmd(0xDB);  // Set VCOMH Deselect Level
        oledcmd(0x40);  // VCOMH Deselect Level
        oledcmd(0xA4);  // Set all pixels OFF
        oledcmd(0xA6);  // Set display not inverted
        oledcmd(0xAF);  // Set display On
        oledClear();
    }

    //% line.min=1 line.max=8 line.defl=1
    //% text.defl="Hello,Future"
    //% block="OLED show line %line|text %text"
    //% group="OLED Display"
    export function oledShowUserText(line: number, text: string) {
        if (firstoledinit) {
            oledinit()
            firstoledinit = false
        }
        if(text.length > 16){
            text=text.substr(0, 16)
        }
        line = line - 1
        setText(line, 0);
        for (let c of text) {
            putChar(c);
        }

        for (let i = text.length; i < 16; i++) {
            setText(line, i);
            putChar(" ");
        }
    }
    //% line.min=1 line.max=8 line.defl=2 
    //% n.defl=12345
    //% block="OLED show line %line|number %n"
    //% group="OLED Display"
    export function oledShowUserNumber(line: number, n: number) {
        if (firstoledinit) {
            oledinit()
            firstoledinit = false
        }
        oledShowUserText(line, "" + n)
    }
    //% block="clear display"
    //% group="OLED Display" 
    export function oledClear() {
        //oledcmd(DISPLAY_OFF);   //display off
        for (let j = 0; j < 8; j++) {
            setText(j, 0);
            {
                for (let i = 0; i < 16; i++)  //clear all columns
                {
                    putChar(' ');
                }
            }
        }
        //oledcmd(DISPLAY_ON);    //display on
        setText(0, 0);
    }
}