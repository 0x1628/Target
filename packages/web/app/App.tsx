import * as React from 'react'
import {theme} from 'shared/styled/theme'
import {ThemeProvider, createGlobalStyle} from 'shared/styled/index'
import {EasyReactRouter} from './easy-react-router/index'
import Navbar, {NavBarContext, NavBarContextValue} from './components/NavBar'

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
  line-height: 1;
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

#root {
  min-height: 100vh;
}

#root .EasyReactRouter {
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  background: #eee;
}

#root .EasyReactRouterItem {
  min-height: 100vh;
  width: 100vw;
  background: #fff;
}

.EasyReactRouterItem.enteranim {
  position: absolute;
  top: 0;
  left: 0;
  transition: all .3s ease-out .1s;
  transform: translateX(100vw);
  z-index: 1;
}

.EasyReactRouterItem.enteranim--active {
  transform: translateX(0);
}

.EasyReactRouterItem.exitanim {
  transition: all .3s ease-out;
}

.EasyReactRouterItem.exitanim--active {
  transform: scale(.8);
}

.EasyReactRouterItem.popexitanim {
  transition: all .3s ease-in;
  position: relative;
  z-index: 1;
}

.EasyReactRouterItem.popexitanim--active {
  transform: translateX(100vw);
}

.EasyReactRouterItem.popenteranim {
  position: absolute;
  top: 0;
  left: 0;
  transform: scale(.8);
  transition: all .3s ease-out;
}

.EasyReactRouterItem.popenteranim--active {
  transform: scale(1);
}
`

export default class App extends React.Component {

  state: {context: NavBarContextValue} = {
    context: {
      key: '',
      update: (value) => {
        if (value.key !== this.state.context.key) {
          this.setState({
            context: {
              ...this.state.context,
              ...value,
            },
          })
        }
      },
    },
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <NavBarContext.Provider value={this.state.context}>
          <EasyReactRouter
            alias={{
              '/': '/records',
              '/records/([\\d-]+)': '/records?id=$1',
              '/tasks/([\\w-]+)': '/tasks?id=$1',
            }}
          />
          <Navbar />
          <GlobalStyle />
        </NavBarContext.Provider>
      </ThemeProvider>
    )
  }
}
