import React, { Component } from 'react';
import Timeline from './timeline.jsx';
import TrackControls from './track-controls.jsx';
import Timecode from './timecode.jsx';
import Slider from './slider.jsx';
import Track from './track.jsx';
import MediaTrack from './media-track.jsx';
import computeWidth from '../services/compute-width';

export default class ShowEditor extends Component {

    constructor(props) {
        super(props);

        //this.state = {
        //    name: 'Untitled',
        //    time: 2345,
        //    duration: 192000,
        //    zoom: 100,
        //    outputs: getOutputs(),
        //    tracks: [
        //        {name: 'Be prepared media', type: 'media', channel: 1, src: '', output: '', enabled: true, points: []}
        //    ]
        //};
        //this.state = Object.assign({}, props.show, {outputs: props.outputs});
    }

    componentDidMount() {

    }

    render() {
        if (this.props.show) {
            return <div id="show-editor">
                <div id="controls">
                    <Timecode time={this.props.show.time}/>
                    {this.props.show.tracks.map((t, i) => <TrackControls track={t} index={i} key={i}
                                                                         outputs={this.props.outputs}/>)}
                </div>
                <div id="tracks" style={computeWidth(this.props.show.duration, this.props.show.zoom)}>
                    <Timeline {...this.props.show} />
                    {this.props.show.tracks.map((t, i) => {
                        if (t.type === 'media') {
                            return <MediaTrack {...this.props.show} track={t} index={i} key={i}/>;
                        } else {
                            return <Track {...this.props.show} track={t} index={i} key={i}/>;
                        }
                    })}
                    <Slider {...this.props.show} />
                </div>
            </div>;
        } else {
            return <div id="show-editor">No show selected</div>;
        }
    }
}