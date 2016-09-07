import React, { Component } from 'react';
import Timeline from './timeline.jsx';
import TrackControls from './track-controls.jsx';
import Timecode from './timecode.jsx';
import Slider from './slider.jsx';
import Track from './track.jsx';
import computeWidth from '../services/compute-width';
import addActionListener, { setTime } from '../services/actions';
import { init as initPlayback, play, stop } from '../services/playback';

export default class ShowEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            time: 2345,
            duration: 25900,
            zoom: 100
        };
    }

    componentDidMount() {
        addActionListener('time', time => this.setState({time: Math.min(Math.max(0, time), this.state.duration)}));
        addActionListener('play', () => play(this.state.time, this.state.duration));
        addActionListener('stop', stop);
        addActionListener('rewind', () => setTime(0));

        initPlayback();
    }

    render() {

        return <div id="show-editor">
            <Timecode time={this.state.time}/>
            <div id="controls">
                <TrackControls />
                <TrackControls />
                <TrackControls />
                <TrackControls />
                <TrackControls />
                <TrackControls />
                <TrackControls />
            </div>
            <div id="tracks" style={computeWidth(this.state.duration, this.state.zoom)}>
                <Timeline {...this.state} />

                <Track />
                <Track />
                <Track />
                <Track />
                <Track />
                <Track />
                <Track />
                <Slider {...this.state} />
            </div>
        </div>;
    }
}