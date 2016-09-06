'use strict';

import './styles/main.scss';

import React from 'react';
import { render } from 'react-dom';

import Editor from './components/Editor';

render(<Editor />, document.getElementById('js-main'));