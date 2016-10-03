import React, { Component } from 'react';
import ShowSelector from './show-selector.jsx';
import ShowEditor from './show-editor.jsx';
import ShowControls from './show-controls.jsx';
import addActionListener, { setTime, play as playShow } from '../services/actions';
import { play, stop } from '../services/playback';
import { transmit } from '../services/output';
import { save } from '../services/save-load';
import { getOutputs } from '../services/output';

export default class Editor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shows: [],
            activeShow: null,
            outputs: getOutputs()
        }
    }

    componentDidMount() {
        let getShow = () => this.state.shows[this.state.activeShow];
        let updateShow = obj => {
            let shows = this.state.shows.slice();
            shows[this.state.activeShow] = Object.assign({}, shows[this.state.activeShow], obj);
            this.setState({shows});
        };
        addActionListener('duration', duration => updateShow({duration}));
        addActionListener('time', (time, prev) => {
            updateShow({time: Math.min(Math.max(0, time), getShow().duration)});
            //transmit(getShow().tracks, prev, time);
        });
        addActionListener('play', () => {
            play(getShow().time, getShow().duration);
        });
        addActionListener('stop', stop);
        addActionListener('rewind', () => setTime(0));
        addActionListener('addTrack', track => {
            let tracks = getShow().tracks.slice();
            tracks.push(track);
            updateShow({tracks});
        });
        addActionListener('track', data => {
            let track = Object.assign({}, getShow().tracks[data.index], data.data);
            let tracks = getShow().tracks.slice();
            tracks[data.index] = track;
            updateShow({tracks});
        });
        addActionListener('addPoint', data => {
            let points = getShow().tracks[data.index].points.slice();
            points.push(data.point);
            points.sort((a,b) => a.time < b.time ? -1 : a.time > b.time ? 1 : 0);
            let track = Object.assign({}, getShow().tracks[data.index], {points});
            let tracks = getShow().tracks.slice();
            tracks[data.index] = track;
            updateShow({tracks});
        });
        addActionListener('updatePoint', data => {
            let points = getShow().tracks[data.index].points.slice();
            points.forEach((p,i) => {
                if (i != data.pointIndex) {
                    p.active = false
                }
            });
            points[data.pointIndex] = Object.assign({}, points[data.pointIndex], data.point);
            points.sort((a,b) => a.time < b.time ? -1 : a.time > b.time ? 1 : 0);
            let track = Object.assign({}, getShow().tracks[data.index], {points});
            let tracks = getShow().tracks.slice();
            tracks[data.index] = track;
            updateShow({tracks});
        });
        addActionListener('save', () => {
            let document = Object.assign({}, getShow());
            delete document.outputs;
            save(document);
        });
        addActionListener('load', document => {
            let shows = this.state.shows.slice();
            shows.push(document);
            this.setState({
                activeShow: shows.length - 1, shows
            });
        });
        addActionListener('selectShow', index => {
            this.setState({activeShow: index});
        });
        addActionListener('removeShow', index => {
            let shows = this.state.shows.slice();
            shows.splice(index, 1);
            this.setState({shows});
        });

        window.startShow = name => {
            let show = this.state.shows.find(s => s.name === name);
            if (!show) {
                console.warn('Unknown show: ' + name);
                return;
            }
            this.setState({
                activeShow: this.state.shows.indexOf(show)
            });
            setTime(0);
            playShow();
        };
    }

    render() {
        return <div id="editor">
            <ShowSelector {...this.state} />
            <ShowEditor show={this.state.shows[this.state.activeShow]} outputs={this.state.outputs} />
            <ShowControls />
        </div>;
    }
}