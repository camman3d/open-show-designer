import React, { Component } from 'react';
import { play, rewind, stop, save, addTrack, newShow } from '../services/actions';
import { open } from '../services/save-load';

export default class ShowControls extends Component {
    constructor(props) {
        super(props);
        this.createTrack = this.createTrack.bind(this);
    }

    createTrack() {
        let type = this.refs.trackType.value;
        let track = {points: [], channel: 1, output: '', name: '', enabled: true, type};
        if (type === 'media') {
            track.src = '';
        }
        addTrack(track);
    }

    render() {
        return <div id="show-controls">
            <div id="show-selector-controls">
                <button onClick={newShow}><i className="fa fa-plus" /></button>
            </div>
            <div id="show-track-controls">
                <select ref="trackType">
                    <option value="dmx">DMX Values</option>
                    <option value="color">DMX Color (3 channel)</option>
                    <option value="osc">OSC Flags</option>
                    <option value="media">Media Track</option>
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