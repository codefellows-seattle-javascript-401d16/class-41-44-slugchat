import reducer from '../reducer'
import thunk from './redux-thunk'
import reporter from './redux-reporter'
import {createStore, applyMiddleware} from 'redux'

export default() => createStore(reducer, applyMiddleware(thunk, reporter))
