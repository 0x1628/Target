import * as React from 'react'
import {render} from 'react-dom'
import {persist} from 'react-state-persist'
import {createRoot} from 'shared/store'
import App from './App'

const cached = persist()
const Root = createRoot({}, true) // TODO

render(cached(<Root><App /></Root>), document.getElementById('root'))

if ((module as any).hot) {
  (module as any).hot.accept('./App.tsx', () => {
    // tslint:disable-next-line
    const NewApp = require('./App').default
    render(cached(<Root><NewApp /></Root>), document.getElementById('root'))
  })
}
