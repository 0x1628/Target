import * as React from 'react'

interface EditableProps {
  type: 'singleline' | 'multiline'
  defaultValue?: 'string'
  readOnly: boolean
  placeholder?: string
}

interface EditableState {
  focused: boolean
}

class Editable extends React.Component<EditableProps, EditableState> {
  static emptyDiv = '<div><br /></div>'

  static defaultProps: Partial<EditableProps> = {
    type: 'singleline',
    readOnly: false,
  }

  html: string | null = null
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

  }

  handleFocus = () => {

  }

  handleBlur = () => {

  }

  handleSave(immediateFlag: boolean) {

  }

  render() {
    const {placeholder, readOnly} = this.props
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
      <div
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
