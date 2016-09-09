import React, { Component } from 'react';
import Timeline from './timeline.jsx';
import TrackControls from './track-controls.jsx';
import Timecode from './timecode.jsx';
import Slider from './slider.jsx';
import Track from './track.jsx';
import MediaTrack from './media-track.jsx';
import computeWidth from '../services/compute-width';
import addActionListener, { setTime } from '../services/actions';
import { play, stop } from '../services/playback';
import { init as initOutput, getOutputs, transmit } from '../services/output';
import { init as initSaveLoad, save } from '../services/save-load';

export default class ShowEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: 'Untitled',
            time: 2345,
            duration: 192000,
            zoom: 100,
            outputs: getOutputs(),
            tracks: [
                {name: 'teh media', type: 'media', channel: 1, src: '', output: '', enabled: true, points: []},
                {name: 'Track a', type: 'dmx', channel: 1, output: 'dmx1', enabled: true, points: [
                    {time: 1000, value: 100},
                    {time: 1500, value: 255},
                    {time: 2500, value: 0}
                ]},
                {name: 'Track 3', type: 'osc', channel: 1, output: 'osc1', enabled: true, points: [
                    {time: 1234, value: 100, path: '/sources/1video/start'}
                ]}
            ]
        };
    }

    componentDidMount() {
        addActionListener('duration', duration => this.setState({duration}));
        addActionListener('time', (time, prev) => {
            this.setState({time: Math.min(Math.max(0, time), this.state.duration)});
            transmit(this.state.tracks, prev, time);
        });
        addActionListener('play', () => {
            transmit(this.state.tracks, undefined, this.state.time);
            play(this.state.time, this.state.duration);
        });
        addActionListener('stop', stop);
        addActionListener('rewind', () => setTime(0));
        addActionListener('addTrack', track => {
            let tracks = this.state.tracks.slice();
            tracks.push(track);
            this.setState({tracks});
        });
        addActionListener('track', data => {
            let track = Object.assign({}, this.state.tracks[data.index], data.data);
            let tracks = this.state.tracks.slice();
            tracks[data.index] = track;
            this.setState({tracks});
        });
        addActionListener('addPoint', data => {
            let points = this.state.tracks[data.index].points.slice();
            points.push(data.point);
            points.sort((a,b) => a.time < b.time ? -1 : a.time > b.time ? 1 : 0);
            let track = Object.assign({}, this.state.tracks[data.index], {points});
            let tracks = this.state.tracks.slice();
            tracks[data.index] = track;
            this.setState({tracks});
        });
        addActionListener('updatePoint', data => {
            let points = this.state.tracks[data.index].points.slice();
            points.forEach((p,i) => {
                if (i != data.pointIndex) {
                    p.active = false
                }
            });
            points[data.pointIndex] = Object.assign({}, points[data.pointIndex], data.point);
            points.sort((a,b) => a.time < b.time ? -1 : a.time > b.time ? 1 : 0);
            let track = Object.assign({}, this.state.tracks[data.index], {points});
            let tracks = this.state.tracks.slice();
            tracks[data.index] = track;
            this.setState({tracks});
        });
        addActionListener('save', () => {
            let document = Object.assign({}, this.state);
            delete document.outputs;
            save(document);
        });
        addActionListener('load', document => {
            this.setState(document);
        });
    }

    render() {
        return <div id="show-editor">
            <div id="controls">
                <Timecode time={this.state.time}/>
                {this.state.tracks.map((t, i) => <TrackControls track={t} index={i} key={i} outputs={this.state.outputs} />)}
            </div>
            <div id="tracks" style={computeWidth(this.state.duration, this.state.zoom)}>
                <Timeline {...this.state} />
                {this.state.tracks.map((t, i) => {
                    if (t.type === 'media') {
                        return <MediaTrack {...this.state} track={t} index={i} key={i}/>;
                    } else {
                        return <Track {...this.state} track={t} index={i} key={i}/>;
                    }
                })}
                <Slider {...this.state} />
            </div>
        </div>;
    }
}