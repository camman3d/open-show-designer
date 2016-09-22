import React, { Component } from 'react';
import { selectShow } from '../services/actions';

export default class ShowSelector extends Component {

    render() {
        return <div id="show-selector">
            {this.props.shows.map((show, i) => {
                let classes = 'show' + (this.props.activeShow === i ? ' active' : '');
                return <div key={i} className={classes} onClick={() => selectShow(i)}>{show.name}</div>;
            })}
        </div>;
    }
}