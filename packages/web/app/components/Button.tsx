import * as React from 'react'
import styled from 'shared/styled/index'

const ButtonWrapper = styled.button`
color: ${props => props.theme.primaryColor};
`

interface ButtonProps {
    onClick?(e: React.MouseEvent<any>): void
}

const Button: React.SFC<ButtonProps> = ({children, onClick}) => {
  return (
    <ButtonWrapper onClick={onClick}>{children}</ButtonWrapper>
  )
}

export default Button
