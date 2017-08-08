import {combineReducers} from 'redux'
import token from './token-reducer.js'
import route from './route-reducer.js'

export default combineReducers({token, route})
