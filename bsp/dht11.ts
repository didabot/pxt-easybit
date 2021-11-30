namespace dht11 {
    export enum DataSource {
        //% block="temperature(℃)" enumval=0
        TEMP_C,

        //% block="temperature(℉)" enumval=1
        TEMP_F,

        //% block="humidity(0~100)" enumval=2
        HUMI,
    }

    export function read(dht11type: DataSource, dht11pin: DigitalPin): number {
        //initialize
        let _temperature: number = -999.0
        let _humidity: number = -999.0
        let checksum: number = 0
        let checksumTmp: number = 0
        let dataArray: boolean[] = []
        let resultArray: number[] = []
        for (let index = 0; index < 40; index++) dataArray.push(false)
        for (let index = 0; index < 5; index++) resultArray.push(0)

        pins.setPull(dht11pin, PinPullMode.PullUp)
        pins.digitalWritePin(dht11pin, 0) //begin protocol, pull down pin
        basic.pause(18)
        pins.digitalReadPin(dht11pin) //pull up pin
        control.waitMicros(40)
        while (pins.digitalReadPin(dht11pin) == 0); //sensor response
        while (pins.digitalReadPin(dht11pin) == 1); //sensor response

        //read data (5 bytes)
        for (let index = 0; index < 40; index++) {
            while (pins.digitalReadPin(dht11pin) == 1);
            while (pins.digitalReadPin(dht11pin) == 0);
            control.waitMicros(28)
            //if sensor still pull up data pin after 28 us it means 1, otherwise 0
            if (pins.digitalReadPin(dht11pin) == 1) dataArray[index] = true
        }
        //convert byte number array to integer
        for (let index = 0; index < 5; index++)
            for (let index2 = 0; index2 < 8; index2++)
                if (dataArray[8 * index + index2]) resultArray[index] += 2 ** (7 - index2)
        //verify checksum
        checksumTmp = resultArray[0] + resultArray[1] + resultArray[2] + resultArray[3]
        checksum = resultArray[4]
        if (checksumTmp >= 512) checksumTmp -= 512
        if (checksumTmp >= 256) checksumTmp -= 256
        switch (dht11type){
            case DataSource.TEMP_C:
                _temperature = resultArray[2] + resultArray[3] / 100
                return _temperature
            case DataSource.TEMP_F:
                _temperature = resultArray[2] + resultArray[3] / 100 * 33.8
                return _temperature
            case DataSource.HUMI:
                _humidity = resultArray[0] + resultArray[1] / 100
                return _humidity
        }
        return 0
    }
}
