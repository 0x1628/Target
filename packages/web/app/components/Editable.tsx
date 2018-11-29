import * as React from 'react'
import * as cx from 'classnames'
import styled from 'shared/styled'

interface EditableProps {
  type: 'singleline' | 'multiline'
  defaultValue?: string
  className?: string
  readOnly: boolean
  placeholder?: string
  onChange(str: string): void
}

interface EditableState {
  focused: boolean
}

const EditableWrapper = styled.div`
  outline: none;

  &.is-placeholder {
    color: ${props => props.theme.textColorMuted}
  }
`

class Editable extends React.Component<EditableProps, EditableState> {
  static emptyDiv = '<div><br /></div>'

  static defaultProps = {
    type: 'singleline',
    readOnly: false,
  }

  html = ''
  changed = false
  state: EditableState = {focused: false}
  inputEl: HTMLElement | null = null

  constructor(props: EditableProps) {
    super(props)

    if (props.defaultValue) {
      this.html = props.defaultValue
    }
  }

  componentWillUnMount() {
    if (this.state.focused) {
      this.handleSave(true)
    }
  }

  isContentBlank() {
    return !this.html || !this.html.replace(/<.+?>/g, '').length
  }

  clean() {
    if (!this.html) return ''
    this.html = this.html.replace(/(<div><br ?\/?><\/div>)+$/, '')
    return this.html
  }

  handlePaste = (e: React.ClipboardEvent) => {
    let text = e.clipboardData.getData('text/plain')
    if (!text) return
    if (this.props.type === 'multiline') {
      text = text.replace(/\n/ig, '<br />')
    }
    e.preventDefault()
    document.execCommand('insertHTML', false, text)
  }

  handleInput = () => {
    this.changed = true
    if (!this.inputEl!.innerHTML || /^<br ?\/?>$/.test(this.inputEl!.innerHTML)) {
      this.inputEl!.innerHTML = Editable.emptyDiv
    }
    this.html = this.inputEl!.innerHTML
    this.handleSave()
  }

  handleFocus = () => {
    this.setState({focused: true})
    const s = window.getSelection()
    const r = document.createRange()
    r.setStart(this.inputEl!, 0)
    r.setEnd(this.inputEl!, 0)
    s.removeAllRanges()
    s.addRange(r)
  }

  handleBlur = () => {
    this.setState({focused: false})
    this.html = this.inputEl!.innerHTML
    this.handleSave(true)
  }

  handleSave(immediateFlag = false) {
    const {type, onChange} = this.props

    if (onChange && this.changed) {
      const result = type === 'singleline' ? this.html.replace(/<.+?>/g, '')
        : this.clean()
      onChange(result)
    }
  }

  render() {
    const {placeholder, readOnly, className} = this.props
    const {focused} = this.state

    let html = this.html
    let usePlaceholder = false

    if (this.isContentBlank() && placeholder && !focused) {
      html = placeholder
      usePlaceholder = true
    }

    if (readOnly) {
      return (
        <div dangerouslySetInnerHTML={{__html: html || Editable.emptyDiv}} />
      )
    }

    return (
      <EditableWrapper
        className={cx(className, usePlaceholder && 'is-placeholder')}
        role="textbox"
        tabIndex={0}
        contentEditable
        onPaste={this.handlePaste}
        onInput={this.handleInput}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        ref={node => this.inputEl = node}
        dangerouslySetInnerHTML={{__html: html || Editable.emptyDiv}}
      />
    )
  }

}

export default Editable
