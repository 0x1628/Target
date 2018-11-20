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
}

interface EasyReactRouterState {
  currentPage: React.ComponentClass | null
  loading: boolean
}

export class EasyReactRouter extends React.Component<EasyReactRouterProps, EasyReactRouterState> {
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
    const {base} = this.props
    const locationObject = new URL(location, 'http://whatever/')
    let path = locationObject.pathname.slice(1)
    if (!path) {
      path = 'index'
    }
    const pageFolderName = path.replace(/\//ig, '-')
    import(`./${base}/${pageFolderName}/index`).then(res => {
      if (!res || !res.default) {
        throw new Error('NotFound')
      }
      this.setState({
        currentPage: res.default || null,
        loading: false,
      })
    }).catch(e => {
      if (path !== '404') {
        this.findTargetPage('/404', e)
      } else {
        console.error(originError || e)
        this.setState({
          currentPage: null,
          loading: false,
        })
      }
    })
  }

  render() {
    const {currentPage: CurrentPage, loading} = this.state
    if (loading || !CurrentPage) return null
    return <CurrentPage />
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
  children?: React.ReactNode
}

export function Link({
  href,
  target,
  children,
  Component,
  ...rest}: LinkProps) {
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
