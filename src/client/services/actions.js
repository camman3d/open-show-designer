
let listeners = {};

export default function addActionListener(action, handler) {
    listeners[action] = listeners[action] || [];
    listeners[action].push(handler);
}

function emit(action) {
    let args = Array.prototype.slice.call(arguments, 1);
    if (listeners[action]) {
        listeners[action].forEach(l => l.apply(null, args));
    }
}

export function setTime(time, prevTime) { emit('time', time, prevTime); }

export function play() { emit('play'); }

export function stop() { emit('stop'); }

export function rewind() { emit('rewind'); }

export function updateTrack(index, key, value) {
    emit('track', {
        data: {[key]: value},
        index
    });
}

export function addPoint(index, time, value) {
    emit('addPoint', {point: {time, value}, index});
}

export function updatePoint(index, pointIndex, point) {
    emit('updatePoint', {index, pointIndex, point});
}