import React, { Component } from 'react';
import { addPoint } from '../services/actions';

export default class Track extends Component {

    constructor(props) {
        super(props);
        this.addPoint = this.addPoint.bind(this);
        this.getPointPos = this.getPointPos.bind(this);
        this.drawConnection = this.drawConnection.bind(this);
    }

    componentDidMount() {
        this.baseRect = this.refs.base.getBoundingClientRect();
    }

    addPoint(event) {
        let rect = this.refs.base.getBoundingClientRect();
        let pixels = {
            x: event.pageX - this.baseRect.left - 20 + (this.baseRect.left - rect.left),
            y: event.pageY - this.baseRect.top + (this.baseRect.top - rect.top)
        };
        let time = (pixels.x / this.props.zoom) * 1000;
        time = Math.round(time * 1000) / 1000; // Clean up floating pointer
        let value = 255 - Math.round((pixels.y / rect.height) * 255);
        if (time < 0 || time > this.props.duration) {
            return;
        }
        addPoint(this.props.index, time, value);
    }

    getPointPos(point, height) {
        return {
            left: (point.time / 1000) * this.props.zoom,
            top: ((255 - point.value) / 255) * height
        };
    }

    drawConnection(pos1, pos2, height) {
        let width = pos2.left - pos1.left;
        let points = `0,${pos1.top} ${width},${pos2.top} ${width},${height}, 0,${height}`;
        let style = {
            left: pos1.left,
            width
        };
        return <svg style={style}>
            <polygon points={points} />
            <line x1="0" y1={pos1.top} x2="100%" y2={pos2.top} />
        </svg>;
    }

    render() {
        const { track } = this.props;

        let height = this.baseRect ? this.baseRect.height : 150;
        let pointsPos = track.points.map(p => this.getPointPos(p, height));
        let connections = Array.apply(null, {length: pointsPos.length - 1}).map((_, i) =>
            this.drawConnection(pointsPos[i], pointsPos[i+1], height));

        return <div className="track" ref="base" onDoubleClick={this.addPoint}>
            {connections}
            {pointsPos.map(pos => <div className="point" style={pos}></div>)}
        </div>;
    }
}