import addActionListener, { setTime } from './actions';

let electron;
let playInterval;
let playStatus = 'stopped';
let playTime;

addActionListener('time', time => playTime = time);

export function init() {
    if (process.env.TARGET === 'web') {
        console.log('Running in web mode');
    } else {
        console.log('Running in electron mode');
        electron = require('electron');
    }
}

export function play(startTime, showDuration) {
    if (playStatus === 'playing') {
        return;
    }
    playStatus = 'playing';
    playTime = startTime;
    if (playTime >= showDuration) {
        setTime(0);
    }
    let time = Date.now();
    playInterval = setInterval(() => {

        // Keep track of actual time
        let newTime = Date.now();
        let prev = playTime;
        playTime += newTime - time;
        time = newTime;

        setTime(playTime, prev);

        // Check
        if (playTime >= showDuration) {
            stop();
        }
    }, 30);
}

export function stop() {
    if (playStatus === 'stopped') {
        return;
    }
    playStatus = 'stopped';
    clearInterval(playInterval);
}

export function transmit(tracks, prevTime, time) {
    tracks.forEach(track => {
        if (track.type === 'osc' && prevTime !== undefined) {
            for (let point of track.points) {
                if (time < point.time) {
                    break;
                }
                if (point.time > prevTime && point.time <= time) {
                    console.log('Send osc', track.output, point.path);
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
                    console.log('Set dmx', track.output, track.channel, val);
                }
            }
        }
    })
}