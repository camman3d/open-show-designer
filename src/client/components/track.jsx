import React, { Component } from 'react';
import Point from './point.jsx';
import { addPoint } from '../services/actions';
import layoutSizes from '../services/layout-sizes';

function connect(pos1, pos2,i ) {
    let width = pos2.left - pos1.left;
    let points = `0,${pos1.top} ${width},${pos2.top} ${width},${layoutSizes.trackHeight}, 0,${layoutSizes.trackHeight}`;
    let style = {
        left: pos1.left,
        width
    };
    return <svg style={style} key={i}>
        <polygon points={points} />
        <line x1="0" y1={pos1.top} x2="100%" y2={pos2.top} />
    </svg>;
}

export default class Track extends Component {

    constructor(props) {
        super(props);
        this.addPoint = this.addPoint.bind(this);
        this.getPointPos = this.getPointPos.bind(this);
    }

    addPoint(event) {
        let rect = this.refs.base.getBoundingClientRect();
        let pixels = {
            x: event.pageX - layoutSizes.tracksLeft - layoutSizes.trackMargin + (layoutSizes.tracksLeft - rect.left),
            y: event.pageY - layoutSizes.tracksTop + (layoutSizes.tracksTop - rect.top)
        };
        let time = (pixels.x / this.props.zoom) * 1000;
        time = Math.round(time * 1000) / 1000; // Clean up floating pointer
        let value = 255 - Math.round((pixels.y / rect.height) * 255);
        if (time < 0 || time > this.props.duration) {
            return;
        }
        addPoint(this.props.index, time, value);
    }

    getPointPos(point) {
        return {
            left: (point.time / 1000) * this.props.zoom + layoutSizes.trackMargin,
            top: ((255 - point.value) / 255) * layoutSizes.trackHeight
        };
    }

    render() {
        const { track } = this.props;

        let pointsPos = track.points.map(p => this.getPointPos(p));
        let connections;
        if (track.type === 'dmx') {
            connections = Array.apply(null, {length: pointsPos.length - 1})
                .map((_, i) => connect(pointsPos[i], pointsPos[i+1], i));
        }

        return <div className="track" ref="base" onDoubleClick={this.addPoint}>
            {connections}
            {pointsPos.map((pos, i) =>
                <Point {...this.props} pos={pos} key={i} pointIndex={i} point={track.points[i]} type={track.type} />)}
        </div>;
    }
}