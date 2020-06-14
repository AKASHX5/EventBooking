import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import APP from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<APP/>, document.getElementById('root'));

serviceWorker.unregister();