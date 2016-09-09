import React, { Component } from 'react';
import Point from './point.jsx';
import { addPoint } from '../services/actions';
import layoutSizes from '../services/layout-sizes';
import { getMedia } from '../services/media-registry';
import addActionListener, { removeActionListener }  from '../services/actions';
import { openMedia } from '../services/save-load';

export default class MediaTrack extends Component {

    constructor(props) {
        super(props);
        this.playListener = this.playListener.bind(this);
        this.stopListener = this.stopListener.bind(this);
        this.timeListener = this.timeListener.bind(this);
        this.scrollHandler = this.scrollHandler.bind(this)
        this.getWaveform = this.getWaveform.bind(this)
        this.state = {
            left: 0
        };
    }

    componentDidMount() {
        this.refs.base.parentElement.parentElement.addEventListener('scroll', this.scrollHandler);
        addActionListener('play', this.playListener);
        addActionListener('stop', this.stopListener);
        addActionListener('time', this.timeListener);
    }

    componentWillUnmount() {
        removeActionListener('play', this.playListener);
        removeActionListener('stop', this.stopListener);
        removeActionListener('time', this.timeListener);
    }

    playListener() {
        if (!this.refs.media || !this.props.track.enabled) {
            return;
        }
        this.refs.media.currentTime = this.props.time / 1000;
        this.refs.media.play();
    }
    stopListener() {
        if (!this.refs.media || !this.props.track.enabled) {
            return;
        }
        this.refs.media.pause();
    }
    timeListener(t, p) {
        if (this.refs.media && p === undefined && this.props.track.enabled) {
            // Seeking, not play update
            this.refs.media.currentTime = t / 1000;
        }
    }
    getWaveform() {
        openMedia().then(media => {
            this.setState({
                waveform: {
                    backgroundImage: `url("${media.url}")`
                }
            });
        })
    }

    scrollHandler() {
        let parentLeft = this.refs.base.parentElement.getBoundingClientRect().left;
        let left = layoutSizes.showSelectorWidth + layoutSizes.trackControlWidth - parentLeft;
        this.setState({left});
    }

    render() {
        const { track } = this.props;
        let media = getMedia(track.src);
        if (media) {
            let type = media.mimeType.substr(0, 5);

            return <div className="track" ref="base">
                {type === 'video' ? <video ref="media" src={media.url} style={this.state} /> : null}
                {type === 'audio' ? <div>
                    <div className="waveform" style={this.state.waveform}></div>
                    <button className="waveform-select" onClick={this.getWaveform}>Select Waveform</button>
                    <audio ref="media" src={media.url} style={this.state} />
                </div> : null}
            </div>;
        } else {
            return <div className="track" ref="base">No media selected</div>;
        }
    }
}