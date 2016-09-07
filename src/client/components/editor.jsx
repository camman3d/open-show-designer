import React, { Component } from 'react';
import ShowSelector from './show-selector.jsx';
import ShowEditor from './show-editor.jsx';
import ShowControls from './show-controls.jsx';

export default class Editor extends Component {

    render() {
        //<Timeline {...this.state} />

        return <div id="editor">
            <ShowSelector />
            <ShowEditor />
            <ShowControls />
        </div>;
    }
}