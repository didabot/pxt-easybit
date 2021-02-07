namespace cls381 {
    const IIC_ADDR = 0x53;
    enum registers {
        MAIN_CTRL = 0x00,
        ALS_CS_MEAS_RATE = 0x04,
        ALS_CS_GAIN = 0x050,
        PART_ID = 0x06,
        MAIN_STATUS = 0x07,
        CS_DATA_IR_0 = 0x0A,
        CS_DATA_IR_1 = 0x0B,
        CS_DATA_IR_2 = 0x0C,
        CS_DATA_GREEN_0 = 0x0D,
        CS_DATA_GREEN_1 = 0x0E,
        CS_DATA_GREEN_2 = 0x0F,
        CS_DATA_RED_0 = 0x10,
        CS_DATA_RED_1 = 0x11,
        CS_DATA_RED_2 = 0x12,
        CS_DATA_BLUE_0 = 0x13,
        CS_DATA_BLUE_1 = 0x14,
        CS_DATA_BLUE_2 = 0x15,
        INT_CFG = 0x19,
        INT_PST = 0x1A,
        ALS_THRES_UP_0 = 0x21,
        ALS_THRES_UP_1 = 0x0E,
        ALS_THRES_UP_2 = 0x0E,
        ALS_THRES_LOW_0 = 0x0E,
        ALS_THRES_LOW_1 = 0x0E,
        ALS_THRES_LOW_2 = 0x0E        
    }

    let initialised = false;
    function init() {
        if (initialised)
            return;
        Easybit.i2cwrite(IIC_ADDR, registers.MAIN_CTRL, 0x04);
        control.waitMicros(10000);
        Easybit.i2cwrite(IIC_ADDR, registers.ALS_CS_MEAS_RATE, 0x41);
        Easybit.i2cwrite(IIC_ADDR, registers.ALS_CS_GAIN, 0x00);
        Easybit.i2cwrite(IIC_ADDR, registers.INT_CFG, 0x00);
        Easybit.i2cwrite(IIC_ADDR, registers.MAIN_CTRL, 0x06); 
        control.waitMicros(10000);
        initialised = true;
    } 

    function ir() {
        let data0, data1, data2, value : number;

        init();
        data0 = Easybit.i2cread(IIC_ADDR, registers.CS_DATA_IR_0);
        data1 = Easybit.i2cread(IIC_ADDR, registers.CS_DATA_IR_1);
        data2 = Easybit.i2cread(IIC_ADDR, registers.CS_DATA_IR_2);
        value = (data2 << 16) | (data1 << 8) | data0;
        return value;
    }

    export function red() {
        let data0, data1, data2, value : number;

        init();
        data0 = Easybit.i2cread(IIC_ADDR, registers.CS_DATA_RED_0);
        data1 = Easybit.i2cread(IIC_ADDR, registers.CS_DATA_RED_1);
        data2 = Easybit.i2cread(IIC_ADDR, registers.CS_DATA_RED_2);
        value = (data2 << 16) | (data1 << 8) | data0;
        return value;
    }

    export function green() {
        let data0, data1, data2, value : number;

        init();
        data0 = Easybit.i2cread(IIC_ADDR, registers.CS_DATA_GREEN_0);
        data1 = Easybit.i2cread(IIC_ADDR, registers.CS_DATA_GREEN_1);
        data2 = Easybit.i2cread(IIC_ADDR, registers.CS_DATA_GREEN_2);
        value = (data2 << 16) | (data1 << 8) | data0;
        return value;
    }

    export function blue() {
        let data0, data1, data2, value : number;

        init();
        data0 = Easybit.i2cread(IIC_ADDR, registers.CS_DATA_BLUE_0);
        data1 = Easybit.i2cread(IIC_ADDR, registers.CS_DATA_BLUE_1);
        data2 = Easybit.i2cread(IIC_ADDR, registers.CS_DATA_BLUE_2);

        value = (data2 << 16) | (data1 << 8) | data0;
        return value;
    }
}
