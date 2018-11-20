import * as React from 'react'
import RecordContainer from 'shared/containers/RecordContainer'
import {EasyReactRouter, Link} from './easy-react-router'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <RecordContainer>
          Hello world, demix
          <div>Nice to see you</div>
          <EasyReactRouter />

          <Link href="/goals">goals</Link>
        </RecordContainer>
      </div>
    )
  }
}
