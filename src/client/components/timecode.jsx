import React from 'react';
import { setDuration } from '../services/actions';

export default props => {
    let millis = props.time;
    let hours = Math.floor(millis / (1000 * 60 * 60));
    millis -= hours * 1000 * 60 * 60;
    let mins = Math.floor(millis / (1000 * 60));
    millis -= mins * 1000 * 60;
    let secs = Math.floor(millis / 1000);
    millis -= secs * 1000;

    mins = mins < 10 ? '0' + mins : '' + mins;
    secs = secs < 10 ? '0' + secs : '' + secs;
    millis = millis < 10 ? '00' + millis : millis < 100 ? '0' + millis : '' + millis;
    let timecode = [hours, mins, secs, millis].join(':');

    return <div id="timecode">{timecode}</div>;
}