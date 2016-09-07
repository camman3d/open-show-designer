import React, { Component } from 'react';

export default class Slider extends Component {

    render() {
        let style = {
            left: (this.props.time / 1000) * this.props.zoom + 20
        };
        return <div id="slider" style={style}></div>;
    }
}