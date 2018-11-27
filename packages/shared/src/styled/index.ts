import * as styledComponents from 'styled-components'

interface ThemeInterface {
  primaryColor: string
  linkColor: string
  successColor: string
  errorColor: string
  fontSizeBase: string
  textColor: string
  textColorSecondary: string
  headingColor: string
  disabledColor: string
  borderColor: string
}

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<ThemeInterface>

export {css, createGlobalStyle, keyframes, ThemeProvider, ThemeInterface}
export default styled
