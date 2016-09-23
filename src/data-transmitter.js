let osc = require('node-osc');
let artnet = require('./artnet');
let fs = require('fs');

// Load the outputs
console.log('Loading outputs from outputs.json');
let outputs = JSON.parse(fs.readFileSync('./outputs.json').toString());
let clients = {};
Object.keys(outputs).forEach(key => {
    let output = outputs[key];
    if (output.type === 'osc') {
        clients[key] = new osc.Client(output.host, output.port);
    }
    if (output.type === 'dmx') {
        clients[key] = artnet({host: output.host});
    }
});

exports.getOutputs = function () {
    return outputs;
};

exports.sendDmx = function (output, channel, value) {
    if (!clients[output]) {
        console.log('Unknown client: ' + output);
    } else {
        clients[output].set(outputs[output].universe, channel, value);
    }
};

exports.sendOsc = function (output, path) {
    if (!clients[output]) {
        console.log('Unknown client: ' + output);
    } else {
        let parts = path.split(' ');
        parts.forEach((part, i) => {
            let n = Number(part);
            if (!isNaN(n)) {
                parts[i] = n;
            }
        });
        clients[output].send.apply(clients[output], parts);
    }
};

exports.closeClients = function () {
    Object.keys(outputs).forEach(key => {
        let output = outputs[key];
        if (output.type === 'osc') {
            clients[key].kill();
        } else if (output.type === 'dmx') {
            clients[key].close();
        }
    });
};


//module.exports = {
//    init: connectionData => {
//        return connectionData.map(d => {
//            winston.info('Establishing connections');
//            if (d.type === 'osc') {
//                return Object.assign({}, d, {client: new osc.Client(d.host, d.port)});
//            } else if (d.type === 'e131') {
//                return Object.assign({}, d, {client: new e131.Client(d.host, d.port)});
//            } else {
//                winston.error('Unsupported connection type: ' + d.type);
//            }
//        });
//    },
//
//    send: (connections, transmissionData) => {
//        connections.forEach(c => {
//            if (transmissionData[c.name]) {
//                if (c.type === 'osc') {
//                    transmissionData[c.name].forEach(t => t.forEach(data => c.client.send.apply(c.client, data)));
//                } else if (c.type === 'e131') {
//                    winston.info('TODO: Transmit e1.31 data');
//                } else {
//                    winston.error('Unsupported connection type: ' + d.type);
//                }
//            }
//        });
//    },
//
//    close: connections => {
//        winston.info('Closing connections');
//        connections.forEach(c => {
//            if (c.type === 'osc') {
//                c.client.kill();
//            }
//        });
//    }
//};