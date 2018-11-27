import * as React from 'react'
import styled from 'shared/styled/index'

const ButtonWrapper = styled.button`
padding: 0;
margin: 0;
background: none;
border: 0;
`

const PlainButtonWrapper = styled(ButtonWrapper)``
const PrimaryButtonWrapper = styled(ButtonWrapper)``
const NormalButtonWrapper = styled(ButtonWrapper)``

const ButtonSet = {
  plain: PlainButtonWrapper,
  primary: PrimaryButtonWrapper,
  normal: NormalButtonWrapper,
}

interface ButtonProps {
  preset?: 'plain' | 'primary' | 'normal'
  onClick?(e: React.MouseEvent<any>): void
}

const Button: React.FunctionComponent<ButtonProps> = ({children, onClick, preset = 'normal'}) => {
  const TargetButton = ButtonSet[preset]
  return (
    <TargetButton onClick={onClick}>{children}</TargetButton>
  )
}

export default Button
