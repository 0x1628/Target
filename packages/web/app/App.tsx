import * as React from 'react'
import {EasyReactRouter, Link} from './easy-react-router'

export default class App extends React.Component {
  render() {
    return (
      <>
        <EasyReactRouter
          default="records"
          wildcards={{
            '/records/([\\d-]+)$': 'records',
          }}
        />
        <Link href="/all">all</Link>
      </>
    )
  }
}
