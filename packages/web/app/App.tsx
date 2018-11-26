import * as React from 'react'
import {theme} from 'shared/styled/theme'
import {ThemeProvider, createGlobalStyle} from 'shared/styled/index'
import {EasyReactRouter, Link} from './easy-react-router'

const GlobalStyle = createGlobalStyle`
body, div {
  display: flex;
  flex-direction: column;
}
`

const Layout: React.SFC = ({children}) => {
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
