
let listeners = {};

export default function addActionListener(action, handler) {
    listeners[action] = listeners[action] || [];
    listeners[action].push(handler);
}

function emit(action, data) {
    if (listeners[action]) {
        listeners[action].forEach(l => l(data));
    }
}

export function setTime(time) { emit('time', time); }

export function play() { emit('play'); }

export function stop() { emit('stop'); }

export function rewind() { emit('rewind'); }