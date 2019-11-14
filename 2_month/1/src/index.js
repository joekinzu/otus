import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter} from 'react-router-dom' 
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import reduxThunk from 'redux-thunk'
import rootReducer from './store/rootreducer'
import App from './app'

const store = createStore(rootReducer,applyMiddleware(reduxThunk))

render(<Provider store={store}><BrowserRouter><App/></BrowserRouter></Provider>, document.getElementById('root'))
