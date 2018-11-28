import * as React from 'react'
import styled, {ThemeInterface} from 'shared/styled/index'
import {plain, solid, ghost, circle} from 'shared/styled/button'

const PlainButtonWrapper = styled.button`${plain};`
const SolidButtonWrapper = styled.button`${solid}`
const GhostButtonWrapper = styled.button`${ghost}`
const CircleButtonWrapper = styled.button`${circle}`

const ButtonSet = {
  plain: PlainButtonWrapper,
  solid: SolidButtonWrapper,
  ghost: GhostButtonWrapper,
  circle: CircleButtonWrapper,
}

interface ButtonProps {
  preset?: 'plain' | 'solid' | 'ghost' | 'circle'
  color?: 'primary' | 'success' | 'error' | 'disabled' | any
  [key: string]: any
  onClick?(e: React.MouseEvent<any>): void
}

const getColor = (theme: ThemeInterface, color: ButtonProps['color']) => {
  if (color.startsWith('rgb') || color.startsWith('#')) {
    return color
  }
  return (theme as any)[`${color}Color`]
}

const Button: React.FunctionComponent<ButtonProps> =
  ({children, onClick, preset = 'ghost', color = 'primary', ...rest}) => {
  const TargetButton = ButtonSet[preset]
  let TargetButtonColored = styled(TargetButton)`
    color: ${props => getColor(props.theme, color)};
    border-color: ${props => getColor(props.theme, color)};
    fill: ${props => getColor(props.theme, color)};
  `
  if (preset === 'solid') {
    TargetButtonColored = styled(TargetButtonColored)`
      background: ${props => getColor(props.theme, color)};
    `
  }
  return (
    <TargetButtonColored {...rest} onClick={onClick}>{children}</TargetButtonColored>
  )
}

export default Button
