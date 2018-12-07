import * as React from 'react'
import {history} from './history'

interface LinkProps {
  href: string
  target?: '_blank' | '_self' | undefined
  Component?: string | React.ComponentClass
  onClick?(e: MouseEvent): boolean | void
}

export const Link: React.FunctionComponent<LinkProps> = ({
  href,
  target,
  children,
  Component,
  onClick,
  ...rest}) => {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    if (onClick) {
      if (onClick(e)) {
        return
      }
    }

    const url = new URL(href, location.origin)
    if (url.origin !== location.origin) {
      location.href = href
      return
    }

    if (target === '_blank') {
      window.open(href)
    } else {
      history.push(`${url.pathname}${url.search}${url.hash}`)
    }
  }

  Component = Component || 'a'

  return (
    <Component
      onClick={handleClick}
      href={href}
      target={target}
      {...rest}
    >
      {children}
    </Component>
  )
}
