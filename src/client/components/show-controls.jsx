import React, { Component } from 'react';
import { play, rewind, stop, save, addTrack } from '../services/actions';
import { open } from '../services/save-load';

export default class ShowControls extends Component {
    constructor(props) {
        super(props);
        this.createTrack = this.createTrack.bind(this);
    }

    createTrack() {
        let track = {type: this.refs.trackType.value, points: [], channel: 1, output: '', name: '', enabled: true};
        addTrack(track);
    }

    render() {
        return <div id="show-controls">
            <div id="show-selector-controls">

            </div>
            <div id="show-track-controls">
                <select ref="trackType">
                    <option value="dmx">DMX Values</option>
                    <option value="color">DMX Color (3 channel)</option>
                    <option value="osc">OSC Flags</option>
                    <option value="audio">Audio Track</option>
                </select>
                <button onClick={this.createTrack}><i className="fa fa-plus" /> Track</button>
            </div>

            <div id="show-playback-controls">
                <button onClick={rewind}><i className="fa fa-fast-backward" /></button>
                <button onClick={play}><i className="fa fa-play" /></button>
                <button onClick={stop}><i className="fa fa-stop" /></button>
                <button onClick={save}>Save</button>
                <button onClick={open}>Open</button>
            </div>
        </div>;
    }
}