let dataTransmitter;

export function init() {
    if (process.env.TARGET === 'web') {
        console.log('Running in web mode');
        dataTransmitter = {
            sendDmx: (output, channel, value) => {
                console.log('Send dmx', output, channel, value);
            },
            sendOsc: (output, path) => {
                console.log('Send osc', output, path);
            },
            getOutputs: () => ({
                "dmx1": {"type": "dmx", "name": "DMX Output", "universe": 1, "host": "192.168.1.134"},
                "osc1": {"type": "osc", "name": "VPT7", "host": "127.0.0.1", "port": 6666}
            })
        };
    } else {
        console.log('Running in electron mode');
        dataTransmitter = require('electron').remote.require('./data-transmitter');
    }
}

export function getOutputs() {
    return dataTransmitter.getOutputs();
}

export function transmit(tracks, prevTime, time) {
    tracks.forEach(track => {
        if (!track.enabled) {
            return;
        }
        if (track.type === 'osc' && prevTime !== undefined) {
            for (let point of track.points) {
                if (time < point.time) {
                    break;
                }
                if (point.time > prevTime && point.time <= time) {
                    dataTransmitter.sendOsc(track.output, point.path);
                }
            }
        }
        if (track.type === 'dmx') {
            for (let i=0; i < track.points.length - 1; i++) {
                let p1 = track.points[i];
                let p2 = track.points[i + 1];
                if (time < p1.time) {
                    break;
                }
                if (p1.time <= time && p2.time >= time) {
                    // Interpolate the value based on the time
                    let p = (time - p1.time) / (p2.time - p1.time);
                    let val = Math.round((1 - p) * p1.value + p * p2.value);
                    dataTransmitter.sendDmx(track.output, track.channel, val);
                }
            }
            let last = track.points[track.points.length - 1];
            if (last && time > last.time) {
                dataTransmitter.sendDmx(track.output, track.channel, last.value);
            }
        }
    })
}