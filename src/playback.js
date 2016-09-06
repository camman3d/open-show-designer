let winston = require('winston');
let dataTransmitter = require('./data-transmitter');

const defaultOptions = {
    frequency: 30 // 30 ms = Approx. 33 Hz

};

module.exports = function playback(show, options) {
    options = Object.assign({}, defaultOptions, options);
    let connections = dataTransmitter.init(show.connectionData);

    winston.info('Starting show with frequency of ' + options.frequency + 'ms');
    let duration = 0;
    let time = Date.now();
    let interval = setInterval(() => {

        // Keep track of actual time
        let newTime = Date.now();
        let prev = duration;
        duration += newTime - time;
        time = newTime;

        // Transmit data
        let transmissionData = show.generateTransmissionData(prev, duration);
        dataTransmitter.send(connections, transmissionData);

        // Check
        if (duration >= show.duration) {
            winston.info('Show finished');
            dataTransmitter.close(connections);
            clearInterval(interval);
        }
    }, options.frequency);

};