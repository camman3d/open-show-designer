let winston = require('winston');
let osc = require('node-osc');
let e131 = require('e131');


module.exports = {
    init: connectionData => {
        return connectionData.map(d => {
            winston.info('Establishing connections');
            if (d.type === 'osc') {
                return Object.assign({}, d, {client: new osc.Client(d.host, d.port)});
            } else if (d.type === 'e131') {
                return Object.assign({}, d, {client: new e131.Client(d.host, d.port)});
            } else {
                winston.error('Unsupported connection type: ' + d.type);
            }
        });
    },

    send: (connections, transmissionData) => {
        connections.forEach(c => {
            if (transmissionData[c.name]) {
                if (c.type === 'osc') {
                    transmissionData[c.name].forEach(t => t.forEach(data => c.client.send.apply(c.client, data)));
                } else if (c.type === 'e131') {
                    winston.info('TODO: Transmit e1.31 data');
                } else {
                    winston.error('Unsupported connection type: ' + d.type);
                }
            }
        });
    },

    close: connections => {
        winston.info('Closing connections');
        connections.forEach(c => {
            if (c.type === 'osc') {
                c.client.kill();
            }
        })
    }
};