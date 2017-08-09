import './style/main.scss'
import React from 'react'
import ReactDom from 'react-dom'
import App from './component/app'
import {Provider} from 'react-redux'
import storeCreate from './lib/util/store-create.js'

let AppContainer = () => (
  <Provider store={storeCreate()}>
    <App/>
  </Provider>
)

ReactDom.render(<App />, document.getElementById('root'))
