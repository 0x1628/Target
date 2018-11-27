import * as React from 'react'
import {theme} from 'shared/styled/theme'
import {ThemeProvider, createGlobalStyle} from 'shared/styled/index'
import {EasyReactRouter, Link} from './easy-react-router'

const GlobalStyle = createGlobalStyle`
a, abbr, acronym, address, applet, article, aside, audio, b, big, blockquote, body,
canvas, caption, center, cite, code, dd, del, details, dfn, div, dl, dt, em, embed,
fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup,
html, i, iframe, img, ins, kbd, label, legend, li, mark, menu, nav, object, ol,
output, p, pre, q, ruby, s, samp, section, small, span, strike, strong, sub, summary,
sup, table, tbody, td, tfoot, th, thead, time, tr, tt, u, ul, var, video {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
}

#react-root, #portal-root, article, div, footer, header, main, nav, section {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;
  flex-shrink: 0;
  margin: 0;
  padding: 0;
}

body, button, input, textarea {
  line-height: 18px;
  font-size: ${props => props.theme.fontSizeBase};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Helvetica Neue', 'PingFang SC', 'Microsoft Yahei', 'WenQuanYi Micro Hei',
    sans-serif;
  color: ${props => props.theme.textColor};
}

a {
  color: ${props => props.theme.linkColor};
  text-decoration: none;
}
`

const Layout: React.FunctionComponent = ({children}) => {
  return (
    <ThemeProvider theme={theme}>
      <>
        {children as JSX.Element}
        <GlobalStyle />
      </>
    </ThemeProvider>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <>
        <EasyReactRouter
          default="records"
          wildcards={{
            '/records/([\\d-]+)$': 'records',
          }}
          renderer={(children) => (<Layout>{children}</Layout>)}
        />
        <Link href="/all">all</Link>
      </>
    )
  }
}
