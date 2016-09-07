import React, { Component } from 'react';
import Toggle from './toggle.jsx';
import { updateTrack } from '../services/actions';

export default class TrackControls extends Component {

    constructor(props) {
        super(props);

        this.toggleTrack = this.toggleTrack.bind(this);
        this.changeTrack = this.changeTrack.bind(this);
    }

    toggleTrack(value) {
        updateTrack(this.props.index, 'enabled', value);
    }

    changeTrack(key, isNumber) {
        return event => {
            let value = isNumber ? Number(event.target.value) : event.target.value;
            updateTrack(this.props.index, key, value);
        };
    }

    render() {
        const { track } = this.props;

        return <div className="track-controls">
            <div className="track-controls-section">
                <input type="text" className="track-title" placeholder="Track Name" value={track.name} onChange={this.changeTrack('name')} />
                <Toggle className="track-toggle-button" value={track.enabled} onClick={this.toggleTrack}>
                    <i className="fa fa-power-off" />
                </Toggle>
            </div>
            <div className="track-controls-section">
                <select value={track.output} onChange={this.changeTrack('output')}>
                    <option value="out1">Output 1</option>
                    <option value="out2">Output 2</option>
                    <option value="out3">Output 3</option>
                </select>
            </div>
            {track.type === 'dmx' ? <div className="track-controls-section">
                Channel:&nbsp;
                <input type="number" min="1" max="512" step="1" value={track.channel} onChange={this.changeTrack('channel', true)} />
            </div> : null}
        </div>;
    }
}