import * as React from 'react'
import {string2string, EventEmitter, queryToObject} from './utils'
import {history} from './history'

interface EasyReactRouterProps {
  base: string
  initLocation?: string
  alias?: string2string
}

interface EasyReactRouterState {
  loading: boolean
  data: any
  key: string | null
  nextData: any
  nextKey: string | null
}

export interface EasyReactRouterComponentProps {
  pathname: string
  query: string2string
  hash: string2string
}

export class EasyReactRouter extends React.Component<EasyReactRouterProps, EasyReactRouterState> {
  static itemClassName = 'EasyReactRouterItem'
  static defaultProps: Partial<EasyReactRouterProps> = {
    base: 'pages',
  }

  currentPage: ValidEasyReactRouterComponent | null = null
  nextPage: ValidEasyReactRouterComponent | null = null
  animating = false
  currentPageNode: HTMLElement | null = null
  nextPageNode: HTMLElement | null = null

  constructor(props: EasyReactRouterProps) {
    super(props)
    if (props.initLocation) { // server render
      this.parse(props.initLocation || '/')
    } else {
      this.state = {loading: true, data: null, key: null, nextData: null, nextKey: null}
    }
  }

  componentDidMount() {
    const {initLocation} = this.props
    if (!initLocation) { // client render
      this.parse(window.location.href)
    }
    window.addEventListener('popstate', this.goBack)
    EventEmitter.addEventListener('pushstate', this.reFind)
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.goBack)
    EventEmitter.removeEventListener('pushstate', this.reFind)
  }

  goBack = (e: PopStateEvent) => {
    const isForward = history.isLastUrl(e)
    this.reFind(isForward)
    history.unsafe_setLength(history.length + (isForward ? 1 : -1))
  }

  reFind = (isForwoard = true) => {
    this.parse(window.location.href, isForwoard)
  }

  parse = async (location: string, isForward = true) => {
    const {page, data, key} = await this.findTargetPage(location)

    const currentPage = this.currentPage
    if (!page) {
      this.currentPage = null
      this.setState({data: null, loading: false, key: null})
      return
    }

    const setFinal = () => {
      return new Promise(resolve => {
        this.animating = false
        this.nextPage = null
        this.currentPage = page
        this.setState({
          data,
          loading: false,
          key,
          nextData: null,
          nextKey: null,
        }, resolve)
      })
    }

    if (!currentPage) { // no need for animation
      this.currentPage = page
      this.setState({data, loading: false, key})
    } else if (
      (isForward && !page.enterAnim) ||
      (!isForward && !currentPage.popExitAnim)
    ) {
      setFinal()
    } else {
      if (this.animating) {
        return
      }
      this.nextPage = page
      this.animating = true

      this.setState({
        nextData: data,
        nextKey: key,
      }, () => {
        if (isForward) {
          page.enterAnim!(this.nextPageNode!).then(() => {
            return setFinal()
          }).then(() => {
            this.currentPageNode!.className = EasyReactRouter.itemClassName
          })
          if (currentPage.exitAnim) {
            currentPage.exitAnim(this.currentPageNode!)
          }
        } else {
          currentPage.popExitAnim!(this.currentPageNode!).then(() => {
            return setFinal()
          }).then(() => {
            this.currentPageNode!.className = EasyReactRouter.itemClassName
          })
          if (page.popEnterAnim) {
            page.popEnterAnim(this.nextPageNode!)
          }
        }
      })
      return
    }
  }

  async findTargetPage(location: string, originError?: any)
    : Promise<{
      page: ValidEasyReactRouterComponent | null,
      data: EasyReactRouterComponentProps | null,
      key: string | null,
  }> {
    const {base, alias} = this.props
    const locationObject = new URL(location, 'http://whatever/')
    if (alias) {
      const currentPathName = locationObject.pathname
      Object.keys(alias).some(re => {
        let targetRe = re
        if (!targetRe.endsWith('$')) {
          targetRe = `${targetRe}$`
        }
        if (!targetRe.startsWith('^')) {
          targetRe = `^${targetRe}`
        }
        const aliasRe = new RegExp(targetRe, 'ig')
        const replaced = currentPathName.replace(aliasRe, alias[re])
        if (replaced !== currentPathName) {
          const [path, search] = replaced.split('?')
          locationObject.pathname = path
          locationObject.search += `&${search || ''}`
          return true
        }
        return false
      })
    }

    const pathname = locationObject.pathname.slice(1)
    const pageFolderName = pathname.replace(/\//ig, '-')

    const data: EasyReactRouterComponentProps = {
      query: queryToObject(locationObject.search),
      hash: queryToObject(locationObject.hash),
      pathname,
    }
    return import(`../${base}/${pageFolderName}/index`).then(res => {
      if (!res || !res.default) {
        throw new Error('NotFound')
      }
      return {
        page: res.default as ValidEasyReactRouterComponent,
        data,
        key: `${locationObject.pathname}-${locationObject.search}-${locationObject.hash}}`,
      }
    }).catch(e => {
      if (pathname !== '404') {
        return this.findTargetPage('/404', e)
      } else {
        console.error(originError || e)
        return {page: null, data: null, key: null}
      }
    })
  }

  render() {
    const {loading, data, key, nextData, nextKey} = this.state
    const CurrentPage = this.currentPage!

    const NextPage = this.nextPage

    if (loading || !CurrentPage) return null

    return (
      <div className="EasyReactRouter">
        <div key={key || '1'} className={EasyReactRouter.itemClassName} ref={el => this.currentPageNode = el}>
          <CurrentPage {...data} />
        </div>
        {NextPage ?
        <div key={nextKey || '2'} className={EasyReactRouter.itemClassName} ref={el => this.nextPageNode = el}>
          <NextPage {...nextData} />
        </div>
        : null
        }
      </div>
    )
  }
}

export class EasyReactRouterComponent<P = {}, S = {}, SS = any>
  extends React.Component<P & EasyReactRouterComponentProps, S, SS> {
  static enterAnim?: Animation
  static exitAnim?: Animation
  static popEnterAnim?: Animation
  static popExitAnim?: Animation
}

export interface EasyReactRouterComponentClass<P = {}, S = {}>
  extends React.ComponentClass<P & EasyReactRouterComponentProps, S> {
  enterAnim?: Animation
  exitAnim?: Animation
  popEnterAnim?: Animation
  popExitAnim?: Animation
}

export interface FunctionEasyReactRouterComponent<P = {}>
  extends React.FunctionComponent<P & EasyReactRouterComponentProps> {
  enterAnim?: Animation
  exitAnim?: Animation
  popEnterAnim?: Animation
  popExitAnim?: Animation
}

type ValidEasyReactRouterComponent = EasyReactRouterComponentClass | FunctionEasyReactRouterComponent

export type Animation = (node: HTMLElement) => Promise<void>
