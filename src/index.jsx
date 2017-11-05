import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './Connect.js'
import thunk from 'redux-thunk';

require('../styles/application.scss')

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const store = createStoreWithMiddleware(reducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root')
)
