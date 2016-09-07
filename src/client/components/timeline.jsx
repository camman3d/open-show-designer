import React, { Component } from 'react';
import computeWidth from '../services/compute-width';
import getGlobalOffset from '../services/get-global-offset';
import { setTime } from '../services/actions';
import layoutSizes from '../services/layout-sizes';

export default class Timeline extends Component {

    constructor(props) {
        super(props);
        this.setTime = this.setTime.bind(this);
        this.startSetTime = this.startSetTime.bind(this);
        this.state = {
            setting: false
        };
    }

    componentDidMount() {
        window.addEventListener('mouseup', () => this.setState({setting: false}));
        window.addEventListener('mousemove', this.setTime);
    }

    setTime(event) {
        if (this.state.setting) {
            let left = this.refs.base.getBoundingClientRect().left;
            let pixels = event.pageX - layoutSizes.tracksLeft - layoutSizes.trackMargin + (layoutSizes.tracksLeft - left);
            let time = (pixels / this.props.zoom) * 1000;
            time = Math.round(time * 1000) / 1000; // Clean up floating pointer
            setTime(time);
        }
    }

    startSetTime(event) {
        let pageX = event.pageX;
        this.setState({setting: true}, () => this.setTime({pageX}));
    }

    render() {

        let markers = Array.apply(null, {length: Math.floor((this.props.duration + 1000) / 1000)}).map((_,i) => {
            let style = {width: this.props.zoom};
            return <div key={i} className="marker" style={style}>{i}s</div>;
        });

        let timebarStyle = {
            width: (this.props.duration / 1000) * this.props.zoom
        };

        return <div id="timeline" onMouseDown={this.startSetTime} ref="base">
            <div id="time-bar-bg"></div>
            <div id="time-bar" style={timebarStyle}></div>
            <div id="time-markers">{markers}</div>
        </div>;
    }
}