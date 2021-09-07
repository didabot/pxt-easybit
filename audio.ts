//% color=#009ede icon="\uf028"
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
            serial.redirect(Easybit.serialTxPin, Easybit.serialRxPin, 9600);
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
     * start play song.
     */
    //% blockId=easybit_play_song block="Play"
    //% weight=130
    export function play() {
        init();
        sendCommand(Command.PLAY, 0, 0);
    }
    
    /**
     * stop play song.
     */
    //% blockId=easybit_stop_play_song block="stop play"
    //% weight=129
    export function stop() {
        init();
        sendCommand(Command.STOP_PLAY, 0, 0);
    }

    /**
     * pause play.
     */
    //% blockId=easybit_pause_play_song block="pause play"
    //% weight=128
    export function pause() {
        init();
        sendCommand(Command.PAUSE, 0, 0);
    }

    /**
     * start play song number.
     * @param num song number
     */
    //% blockId=easybit_play_song_number block="play song |%num|"
    //% weight=127
    export function playNumber(num: number) {
        init();
        sendCommand(Command.SET_FOULDER_SONG, num >> 8, num & 0xFF);
    }

    /**
     * play next song.
     */
    //% blockId=easybit_play_next_song block="play next song"
    //% weight=126
    export function next() {
        init();
        sendCommand(Command.NEXT_SONG, 0, 0);
    }

    /**
     * play previous song.
     */
    //% blockId=easybit_play_previous_song block="play previous song"
    //% weight=125
    export function previous() {
        init();
        sendCommand(Command.PREVIOUS_SONG, 0, 0);
    }

    /**
     * volume up.
     */
    //% blockId=easybit_volume_up block="volume up"
    //% weight=124
    export function volumeUp() {
        init();
        sendCommand(Command.VOL_UP, 0, 0);
    }

    /**
     * volume down.
     */
    //% blockId=easybit_volume_down block="volume down"
    //% weight=123
    export function volumeDown() {
        init();
        sendCommand(Command.VOL_DOWN, 0, 0);
    }

    /**
     * set volume.
     */
    //% blockId=easybit_set_volume block="set volume |%vol|"
    //% weight=122
    //% vol.min=0 vol.max=30
    export function setVolume(vol : number) {
        init();
        sendCommand(Command.SET_VOL, vol >> 8, vol & 0xFF);
    }
}

