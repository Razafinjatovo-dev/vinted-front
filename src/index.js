import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
library.add(faEye, faEyeSlash);

ReactDOM.render(
    <App />,
  document.getElementById('root')
);


