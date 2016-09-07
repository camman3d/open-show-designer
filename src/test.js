//var artnet = require('artnet');
//
//var client = artnet({
//    host: '192.168.1.134'
//});
//
//client.set(1, 1, 255);
//client.set(1, 2, 100);
//client.set(1, 3, 30);
//
//setTimeout(() => client.close(), 150);

exports.setDmx = function (a, b) {
    console.log(a,b);
} ;