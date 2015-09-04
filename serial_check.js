var serialport = require('serialport');
var portName = 'COM5';
var sp = new serialport.SerialPort(portName, {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
    parser: serialport.parsers.readline("\n")
});

sp.on('data', function(input) {
    console.log(input);
});