import React, { Component } from 'react';
import Toggle from './toggle.jsx';
import { updateTrack, updatePoint } from '../services/actions';

export default class TrackControls extends Component {

    constructor(props) {
        super(props);

        this.toggleTrack = this.toggleTrack.bind(this);
        this.changeTrack = this.changeTrack.bind(this);
        this.changePoint = this.changePoint.bind(this);
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

    changePoint(activePoint, key) {
        return event => {
            let value = Number(event.target.value);
            value = isNaN(value) ? event.target.value : value;
            updatePoint(this.props.index, activePoint.index, {[key]: value});
        }
    }

    render() {
        const { track, outputs } = this.props;
        let activePoint = track.points.map((point, index) => ({index, point})).find(p => p.point.active);

        let outputOptions = Object.keys(outputs).map(key => <option key={key} value={key}>{outputs[key].name}</option>);

        return <div className="track-controls">
            <div className="track-controls-section">
                <input type="text" className="track-title" placeholder="Track Name" value={track.name} onChange={this.changeTrack('name')} />
                <Toggle className="track-toggle-button" value={track.enabled} onClick={this.toggleTrack}>
                    <i className="fa fa-power-off" />
                </Toggle>
            </div>
            <div className="track-controls-section">
                <select value={track.output} onChange={this.changeTrack('output')}>
                    <option value="">No Output</option>
                    {outputOptions}
                </select>
            </div>
            {(track.type === 'dmx' || track.type === 'color') ? <div className="track-controls-section">
                Channel:&nbsp;
                <input type="number" min="1" max="512" step="1" value={track.channel} onChange={this.changeTrack('channel', true)} />
            </div> : null}
            {activePoint ? <div className="track-controls-section">
                <div className="half">T: <input type="text" onChange={this.changePoint(activePoint, 'time')} value={activePoint.point.time} /></div>
                {track.type === 'dmx' ? <div className="half">V: <input type="text" onChange={this.changePoint(activePoint, 'value')} value={activePoint.point.value} /></div> : null}
                {track.type === 'osc' ? <div className="half">P: <input type="text" onChange={this.changePoint(activePoint, 'path')} value={activePoint.point.path} /></div> : null}
                {track.type === 'color' ? <div className="half">P: <input type="color" onChange={this.changePoint(activePoint, 'color')} value={activePoint.point.color} /></div> : null}
            </div> : null}
        </div>;
    }
}