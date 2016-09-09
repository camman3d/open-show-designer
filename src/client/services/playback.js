import addActionListener, { setTime, stop as stopAction } from './actions';

let playInterval;
let playStatus = 'stopped';
let playTime;

addActionListener('time', time => playTime = time);

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
            stopAction();
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

