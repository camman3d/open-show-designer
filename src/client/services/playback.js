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
        playTime += newTime - time;
        time = newTime;

        setTime(playTime);

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