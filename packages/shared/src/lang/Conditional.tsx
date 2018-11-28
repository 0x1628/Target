import * as React from 'react'

interface ConditionalProps {
  value: any
  children: [JSX.Element, JSX.Element]
}

const Conditional: React.FunctionComponent<ConditionalProps> = ({value, children}) => {
  const condition = Boolean(value)
  if (condition) {
    return children[0]
  }
  return children[1]
}
