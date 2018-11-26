import * as React from 'react'
import {render} from 'react-dom'
import {persist} from 'react-state-persist'
import {createRoot} from 'shared/store'
import {init} from 'shared/db/index'
import App from './App'

const cached = persist()

init().then(res => {
  const Root = createRoot(res, true) // TODO
  render(cached(<Root><App /></Root>), document.getElementById('root'))

  if ((module as any).hot) {
    (module as any).hot.accept('./App.tsx', () => {
      // tslint:disable-next-line
      const NewApp = require('./App').default
      render(cached(<Root><NewApp /></Root>), document.getElementById('root'))
    })
  }
})
