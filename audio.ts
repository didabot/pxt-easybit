//% color=#149596 icon="\uf028"
//% groups='["MP3 Player"]'
namespace Audio {
    enum Command {
        NEXT_SONG = 0x01,
        PREVIOUS_SONG = 0x02,
        SET_SONG_NUM = 0x03,
        VOL_UP = 0x04,
        VOL_DOWN = 0x05,
        SET_VOL = 0x06,
        SET_EQ = 0x07,
        SINGLE_SONG_LOOP = 0x08,
        SET_MEDIA_SOURCE = 0x09,
        SLEEP = 0x0A,
        RESV = 0x0B,
        RESET = 0x0C,
        PLAY = 0x0D,
        PAUSE = 0x0E,
        PLAY_FOLDER = 0x0F,
        SET_GAIN = 0x10,
        LOOP_ALL = 0x11,
        SET_FOULDER_SONG = 0x12,
        START_ADVERT = 0x13,
        SET_FOLDER = 0x14,
        STOP_ADVERT = 0x15,
        STOP_PLAY = 0x16,
        LOOP_FOLDER = 0x17,
        RADOM_PLAY = 0x18,
        LOOP_PLAY = 0x19,
        SET_DAC = 0x1A,
        MULTI_FOLDER_ADVERT = 0x25
    } 
    
    let initDone: boolean = false;

    const PKG_HDR: number = 0x7E;
    const PKG_VER: number = 0xFF;
    const PKG_LEN: number = 0x06;
    const PKG_END: number = 0xEF;

    let buffer:number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    function doCheckSum() {
        let sum:number = 0;
        let cs_low: number;
        let cs_high: number;
            
        for (let i = 1; i < 7; i++) {
            sum += buffer[i];
        }

        sum = ~sum + 1;
        cs_low = sum & 0xFF;
        cs_high = sum >> 8;
        buffer[7] = cs_high;
        buffer[8] = cs_low;
    }

    function init() {
        if (!initDone) {
            serial.redirect(Controller.serialTxPin, Controller.serialRxPin, 9600);
            basic.pause(100);
            initDone = true;
        }
    }

    function sendCommand(cmd: number, param1: number, param2: number) {
        // makeup protocol package
        buffer[0] = PKG_HDR;
        buffer[1] = PKG_VER;
        buffer[2] = PKG_LEN;
        buffer[3] = cmd;
        buffer[4] = 0;
        buffer[5] = param1;
        buffer[6] = param2;
        buffer[9] = PKG_END;
        doCheckSum();

        let data = pins.createBuffer(10);
        for (let i = 0; i < 10; i++)
            data.setNumber(NumberFormat.UInt8BE, i, buffer[i]);
        serial.writeBuffer(data);
        basic.pause(100);
    }

    /**
     * start play audio.
     */
    //% blockId=mp3_start_play block="MP3 start play"
    //% weight=130
    //% group="MP3 Player"
    export function play() {
        init();
        sendCommand(Command.PLAY, 0, 0);
    }
    
    /**
     * stop play audio.
     */
    //% blockId=mp3_stop_play block="MP3 stop play"
    //% weight=129
    //% group="MP3 Player"
    export function stop() {
        init();
        sendCommand(Command.STOP_PLAY, 0, 0);
    }

    /**
     * pause play.
     */
    //% blockId=mp3_pause_play_ block="MP3 pause play"
    //% weight=128
    //% group="MP3 Player"
    export function pause() {
        init();
        sendCommand(Command.PAUSE, 0, 0);
    }

    /**
     * play audio with number.
     * @param num song number
     */
    //% blockId=mp3_play_audio_with_number block="MP3 play audio |%num|"
    //% weight=127
    //% group="MP3 Player"
    export function playNumber(num: number) {
        init();
        sendCommand(Command.SET_FOULDER_SONG, num >> 8, num & 0xFF);
    }

    /**
     * play next audio.
     */
    //% blockId=mp3_play_next_audio block="MP3 play next audio"
    //% weight=126
    //% group="MP3 Player"
    export function next() {
        init();
        sendCommand(Command.NEXT_SONG, 0, 0);
    }

    /**
     * play previous song.
     */
    //% blockId=mp3_play_previous_audio block="MP3 play previous audio"
    //% weight=125
    //% group="MP3 Player"
    export function previous() {
        init();
        sendCommand(Command.PREVIOUS_SONG, 0, 0);
    }

    /**
     * set volume up.
     */
    //% blockId=mp3_volume_up block="MP3 volume up"
    //% weight=124    
    //% group="MP3 Player"
    export function volumeUp() {
        init();
        sendCommand(Command.VOL_UP, 0, 0);
    }

    /**
     * set volume down.
     */
    //% blockId=mp3_volume_down block="MP3 volume down"
    //% weight=123
    //% group="MP3 Player"
    export function volumeDown() {
        init();
        sendCommand(Command.VOL_DOWN, 0, 0);
    }

    /**
     * set volume level.
     */
    //% blockId=mp3_set_volume_level block="MP3 set volume level |%vol|"
    //% weight=122
    //% vol.min=0 vol.max=30
    //% group="MP3 Player"
    export function setVolume(vol : number) {
        init();
        sendCommand(Command.SET_VOL, vol >> 8, vol & 0xFF);
    }
}

