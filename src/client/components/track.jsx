import React, { Component } from 'react';
import Toggle from './toggle.jsx';

export default class Track extends Component {

    render() {
        return <div className="track">
            <div className="track-controls">
                <div className="track-controls-section">
                    <input type="text" className="track-title" placeholder="Track Name" />
                    <Toggle className="track-toggle-button"><i className="fa fa-power-off" /></Toggle>
                </div>
                <div className="track-controls-section">
                    <select>
                        <option value="1">Output 1</option>
                        <option value="2">Output 2</option>
                        <option value="3">Output 3</option>
                    </select>
                </div>
                <div className="track-controls-section">
                    Ch:&nbsp;
                    <input type="number" min="1" max="512" step="1"/>
                </div>
                <div className="track-controls-section">
                    <div className="half">
                        T:&nbsp;
                        <input type="text" readOnly value="-"/>
                    </div>
                    <div className="half">
                        V:&nbsp;
                        <input type="text" readOnly value="-"/>
                    </div>
                </div>
            </div>

        </div>;
    }
}