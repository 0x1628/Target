import {ThemeInterface} from './index'

export interface ThemeInterface {
  primaryColor: string
  linkColor: string
  successColor: string
  errorColor: string
  fontSizeBase: string
  textColor: string
  textColorSecondary: string
  textColorMuted: string
  headingColor: string
  disabledColor: string
  borderColor: string
  horizontalPadding: string
  zIndexPortal: number
  maskBg: string
  shadowColor: string
  navbarHeight: string
}

export const theme: ThemeInterface = {
  primaryColor: '#007aff',
  linkColor: '#222',
  successColor: '#4cd964',
  errorColor: '#ff2d55',
  fontSizeBase: '14px',
  textColor: '#222',
  textColorSecondary: '#777',
  textColorMuted: '#aaa',
  headingColor: '#222',
  disabledColor: '#8a8a8f',
  borderColor: '#8a8a8f',
  horizontalPadding: '18px',
  navbarHeight: '44px',
  zIndexPortal: 1000,
  maskBg: 'rgba(0, 0, 0, .6)',
  shadowColor: 'rgba(0, 0, 0, .8)',
}
