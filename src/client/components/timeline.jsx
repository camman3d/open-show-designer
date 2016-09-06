import React, { Component } from 'react';

export default class Timeline extends Component {

    constructor(props) {
        super(props);
        this.getTimecode = this.getTimecode.bind(this);
    }

    getTimecode() {
        let millis = this.props.time;
        let hours = Math.floor(millis / (1000 * 60 * 60));
        millis -= hours * 1000 * 60 * 60;
        let mins = Math.floor(millis / (1000 * 60));
        millis -= mins * 1000 * 60;
        let secs = Math.floor(millis / 1000);
        millis -= secs * 1000;

        mins = mins < 10 ? '0' + mins : '' + mins;
        secs = secs < 10 ? '0' + secs : '' + secs;
        millis = millis < 10 ? '00' + millis : '' + millis;
        return [hours, mins, secs, millis].join(':');
    }

    render() {

        let markers = Array.apply(null, {length: Math.ceil((this.props.duration + 1000) / 1000)}).map((_,i) => {
            let style = {width: this.props.zoom};
            return <div className="marker" style={style}>
                {i}s
            </div>;
        });

        let timebarStyle = {
            width: (this.props.duration / 1000) * this.props.zoom
        };

        return <div id="timeline">
            <div id="timecode">{this.getTimecode()}</div>
            <div id="time">
                <div id="time-overflow">
                    <div id="time-bar-bg"></div>
                    <div id="time-bar" style={timebarStyle}></div>
                    <div id="time-markers">{markers}</div>
                </div>
            </div>
        </div>
    }
}