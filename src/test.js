

//
//let host = '192.168.1.134';
//let port = 6465;
//
//let i = setInterval(() => {
//    data[0] += 10;
//
//    let buf = artdmxPackage(0, 3);
//    console.log(buf);
//    socket.send(buf, 0, buf.length, port, host);
//    if (data[0] >= 240) {
//        clearInterval(i);
//        socket.close();
//    }
//}, 40);

var artnet = require('./artnet');

var client = artnet({
    host: '192.168.1.134'
});

let i = 0;
let interval = setInterval(() => {
    i = (i + 1) % 20;
    if (i < 10) {
        client.set(1, 1, 0xff);
    } else {
        client.set(1, 1, 0);
    }
}, 40);
