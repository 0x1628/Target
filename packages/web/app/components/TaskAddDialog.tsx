import * as React from 'react'
import styled, {css} from 'shared/styled'
import {Task} from 'shared/models/Task'
import Modal from './Modal'
import Editable from './Editable'
import Button from './Button'

interface TaskAddDialogProps {
  date?: string
  onRequestClose(): void
  onSubmit(data: Partial<Task>): void
}

const Wrapper = styled.div`
  position: absolute;
  width: 98%;
  left: 1%;
  background: #fff;
  border-radius: 10px;
  padding-top: 20px;
  top: 80px;
  box-shadow: 0 0 10px ${props => props.theme.shadowColor};
  overflow: hidden;
  transition: all ease-out ${Modal.transitionDuration / 1000}s;
  transform: translateY(20px);
  opacity: .2;

  .${Modal.showClassName} & {
    transform: translateY(0);
    opacity: 1;
  }

  .${Modal.hideClassName} & {
    transform: scale(.9);
    opacity: 0;
  }

  & .input-items {
    padding: 0 20px;
    flex: 1;
  }

  & .title-input {
    font-size: 16px;
    line-height: 1.4;
  }

  & .description-input {
    margin-top: 10px;
    line-height: 1.4;
    flex: 1;
    min-height: ${4 * 14 * 1.4}px;
    max-height: ${8 * 14 * 1.4}px;
    overflow: auto;
  }

  & .function-bar {
    height: 35px;
    background: #f8f8f8;
    border-top: 1px solid #bbb;
    justify-content: center;
  }

  & .submit-button {
    margin-left: auto;
    margin-right: 20px;
    height: 24px;
    border-radius: 6px;
    font-weight: 500;
  }
`

const TitleInputStyle = css``

class TaskAddDialog extends React.Component<TaskAddDialogProps> {
  taskData: {title: string, description: string} = {title: '', description: ''}

  handleTitleChange = (str: string) => {
    this.taskData.title = str
  }

  handleDescriptionChange = (str: string) => {
    this.taskData.description = str
  }

  handleSave = () => {
    const {onSubmit} = this.props
    onSubmit({
      ...this.taskData,
    })
  }

  render() {
    return (
      <Wrapper>
        <div className="input-items">
          <Editable
            placeholder="New To-Do"
            onChange={this.handleTitleChange}
            className="title-input"
            onSubmit={this.handleSave}
          />
          <Editable
            placeholder="Notes"
            onChange={this.handleDescriptionChange}
            className="description-input"
            type="multiline"
          />
        </div>
        <div className="function-bar">
          <Button onClick={this.handleSave} preset="solid" className="submit-button">Save</Button>
        </div>
      </Wrapper>
    )
  }
}

export default TaskAddDialog
