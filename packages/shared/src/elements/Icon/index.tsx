import * as React from 'react'
import styled from '../../styled/index'

interface IconProps {
  name: string
}

const Wrapper = styled.div`
flex-direction: column;
align-items: center;

& svg {
  display: block;
}
`

const Icon: React.FunctionComponent<IconProps> = ({name}) => {
  // tslint:disable-next-line:no-require-imports
  const svg = require(`../../../assets/icons/${name}.svg`)
  return (
    <Wrapper className="icon" dangerouslySetInnerHTML={{__html: svg}} />
  )
}

export default Icon
