import * as React from 'react'

interface EasyReactRouterProps {
  base: string
  initLocation?: string
}

interface EasyReactRouterState {
  currentPage: React.ComponentClass | null
  loading: boolean
}

export default class EasyReactRouter extends React.Component<EasyReactRouterProps, EasyReactRouterState> {
  static defaultProps: Partial<EasyReactRouterProps> = {
    base: 'pages',
  }

  constructor(props: EasyReactRouterProps) {
    super(props)
    if (props.initLocation) { // server render
      this.findTargetPage(props.initLocation)
    } else {
      this.state = {loading: true, currentPage: null}
    }
  }

  componentDidMount() {
    const {initLocation} = this.props
    if (!initLocation) { // client render
      this.findTargetPage(window.location.href)
    }
  }

  findTargetPage(location: string) {
    const {base} = this.props
    const locationObject = new URL(location, 'http://whatever/')
    let path = locationObject.pathname.slice(1)
    if (!path) {
      path = 'index'
    }
    const pageFolderName = path.replace(/\//ig, '-')
    import(`./${base}/${pageFolderName}/index`).then(res => {
      this.setState({
        currentPage: res.default || null,
        loading: false,
      })
    }).catch(e => {
      console.error(e)
      this.setState({
        currentPage: null,
        loading: false,
      })
    })
  }

  render() {
    const {currentPage: CurrentPage, loading} = this.state
    if (loading || !CurrentPage) return null
    return <CurrentPage />
  }
}
