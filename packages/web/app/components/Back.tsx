import * as React from 'react'
import {history} from 'easy-react-router'

interface BackProps {
  onClick?(): boolean | void
}

const Back: React.FunctionComponent<BackProps> = ({onClick}) => {
  const clickHandler = () => {
    if (onClick) {
      if (onClick()) return
    }
    history.back()
  }
  return <div onClick={clickHandler}>&lt;</div>
}

export default Back
