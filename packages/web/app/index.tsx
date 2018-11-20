import * as React from 'react'
import {render} from 'react-dom'
import {persist} from 'react-state-persist'
import App from './App'

const cached = persist()

render(cached(<App />), document.getElementById('root'))

if ((module as any).hot) {
  (module as any).hot.accept('./App.tsx', () => {
    // tslint:disable-next-line
    const NewApp = require('./App').default
    render(cached(<NewApp />), document.getElementById('root'))
  })
}
