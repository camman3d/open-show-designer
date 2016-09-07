import React, { Component } from 'react';
import layoutSizes from '../services/layout-sizes';
import { updatePoint } from '../services/actions';

export default class Point extends Component {

    constructor(props) {
        super(props);
        this.handleMove = this.handleMove.bind(this);
        this.handleUp = this.handleUp.bind(this);
        this.handleDown = this.handleDown.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousemove', this.handleMove);
        document.addEventListener('mouseup', this.handleUp);
    }

    handleMove(event) {
        if (this.props.point.moving) {
            let rect = this.refs.point.parentElement.getBoundingClientRect();
            let pixels = {
                x: event.pageX - layoutSizes.tracksLeft - layoutSizes.trackMargin + (layoutSizes.tracksLeft - rect.left),
                y: event.pageY - layoutSizes.tracksTop + (layoutSizes.tracksTop - rect.top)
            };
            let time = (pixels.x / this.props.zoom) * 1000;
            time = Math.round(time * 1000) / 1000; // Clean up floating pointer
            time = Math.min(this.props.duration, Math.max(0, time));
            let value = 255 - Math.round((pixels.y / rect.height) * 255);
            value = Math.min(255, Math.max(0, value));

            updatePoint(this.props.index, this.props.pointIndex, {time, value});
        }
    }

    handleUp() {
        let { time, value, moving } = this.props.point;
        if (moving) {
            updatePoint(this.props.index, this.props.pointIndex, {moving: false, time, value});
        }
    }

    handleDown() {
        let { time, value } = this.props.point;
        updatePoint(this.props.index, this.props.pointIndex, {active: true, moving: true, time, value});
    }

    render() {
        let { point } = this.props;
        let classes = 'point ' + (point.active ? 'active' : '');
        return <div className={classes} ref="point" style={this.props.pos} onMouseDown={this.handleDown}>
            {this.props.type === 'osc' ? <div className="osc-path">{point.path}</div> : null}
        </div>
    }
}