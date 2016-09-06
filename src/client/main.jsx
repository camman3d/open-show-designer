'use strict';

import './styles/main.scss';

import React from 'react';
import { render } from 'react-dom';

import Editor from './components/editor.jsx';

render(<Editor />, document.getElementById('js-main'));