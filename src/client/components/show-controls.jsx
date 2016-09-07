import React, { Component } from 'react';
import { play, rewind, stop } from '../services/actions';

export default class ShowControls extends Component {
    render() {
        return <div id="show-controls">
            <button onClick={rewind}><i className="fa fa-fast-backward" /></button>
            <button onClick={play}><i className="fa fa-play" /></button>
            <button onClick={stop}><i className="fa fa-stop" /></button>
        </div>;
    }
}