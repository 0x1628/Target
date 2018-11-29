import * as React from 'react'

type string2any = {
  [key: string]: any,
}

// tslint:disable:no-invalid-this
const EventEmitter =  {
  _events: {} as string2any,

  addEventListener(ename: string, callback: any) {
    if (!this._events[ename]) {
      this._events[ename] = []
    }
    this._events[ename].push(callback)
  },

  removeEventListener(ename: string, callback: any) {
    if (!this._events[ename]) return
    this._events[ename] = this._events[ename].filter((i: any) => i !== callback)
  },

  dispatchEvent(ename: string) {
    const events = this._events[ename]
    if (events && events.length) {
      events.forEach((e: any) => e())
    }
  },
}
// tslint:enable:no-invalid-this

interface EasyReactRouterProps {
  base: string
  initLocation?: string
  default: string
  wildcards?: string2any
  renderer?(Child: JSX.Element): JSX.Element
}

interface EasyReactRouterState {
  loading: boolean
  data: any
}

export interface EasyReactRouterComponentProps {
  path: string[] | null
  search: string
  hash: string
}

export class EasyReactRouter extends React.Component<EasyReactRouterProps, EasyReactRouterState> {
  static defaultProps: Partial<EasyReactRouterProps> = {
    base: 'pages',
    default: 'index',
  }

  currentPage: React.ComponentClass | null = null

  constructor(props: EasyReactRouterProps) {
    super(props)
    if (props.initLocation) { // server render
      this.findTargetPage(props.initLocation)
    } else {
      this.state = {loading: true, data: null}
    }
  }

  componentDidMount() {
    const {initLocation} = this.props
    if (!initLocation) { // client render
      this.findTargetPage(window.location.href)
    }
    window.addEventListener('popstate', this.reFind)
    EventEmitter.addEventListener('pushstate', this.reFind)
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.reFind)
    EventEmitter.removeEventListener('pushstate', this.reFind)
  }

  reFind = () => {
    this.findTargetPage(window.location.href)
  }

  findTargetPage(location: string, originError?: any) {
    const {base, default: defaultPage, wildcards} = this.props
    const locationObject = new URL(location, 'http://whatever/')
    let path = locationObject.pathname.slice(1)
    if (!path) {
      path = defaultPage
    }
    let pageFolderName = path.replace(/\//ig, '-')
    const data: EasyReactRouterComponentProps = {
      search: locationObject.search.slice(1),
      hash: locationObject.hash.slice(1),
      path: null as null | any[],
    }
    if (wildcards) {
      Object.keys(wildcards).some(re => {
        const pathRe = new RegExp(re, 'ig')
        const result = pathRe.exec(locationObject.pathname)
        if (result) {
          data.path = result.slice(1)
          pageFolderName = wildcards[re]
          return true
        }
        return false
      })
    }

    import(`./${base}/${pageFolderName}/index`).then(res => {
      if (!res || !res.default) {
        throw new Error('NotFound')
      }
      this.currentPage = res.default
      this.setState({
        loading: false,
        data,
      })
    }).catch(e => {
      if (path !== '404') {
        this.findTargetPage('/404', e)
      } else {
        console.error(originError || e)
        this.currentPage = null
        this.setState({
          loading: false,
          data: null,
        })
      }
    })
  }

  render() {
    const {loading, data} = this.state
    const CurrentPage = this.currentPage
    const {renderer} = this.props
    if (loading || !CurrentPage) return null
    if (!renderer) {
      return <CurrentPage {...data} />
    } else {
      return renderer(<CurrentPage {...data} />)
    }
  }
}

export const history = {
  _length: 0,
  back() {
    history.go(-1)
  },
  go(len: number) {
    window.history.go(len)
    history._length = Math.max(0, history._length - len)
  },
}

Object.defineProperty(history, 'length', {
  get() {
    return history._length
  },
  set(length: number) {
    // do nothing
  },
})

interface LinkProps {
  href: string
  target?: '_blank' | '_self' | undefined
  Component?: string | React.ComponentClass
}

export const Link: React.FunctionComponent<LinkProps> = ({
  href,
  target,
  children,
  Component,
  ...rest}) => {
  const onClick = (e: Event) => {
    e.preventDefault()

    const url = new URL(href, location.origin)
    if (url.origin !== location.origin) {
      location.href = href
      return
    }

    if (target === '_blank') {
      window.open(href)
    } else {
      history._length += 1
      window.history.pushState({
        tm: Date.now(),
      }, '', `${url.pathname}${url.search}${url.hash}`)
      EventEmitter.dispatchEvent('pushstate')
    }
  }

  Component = Component || 'a'

  return (
    <Component
      onClick={onClick}
      href={href}
      target={target}
      {...rest}
    >
      {children}
    </Component>
  )
}
