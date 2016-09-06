import React, { Component } from 'react';
import Timeline from './timeline.jsx';
import Track from './track.jsx';

export default class Editor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            time: 2345,
            duration: 25000,
            zoom: 100
        };
    }

    render() {
        return <div>
            <Timeline {...this.state} />
            <Track />
            <Track />
        </div>;
    }
}