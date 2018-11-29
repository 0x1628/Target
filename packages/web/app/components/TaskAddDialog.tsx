import * as React from 'react'
import styled, {css} from 'shared/styled'
import Modal from './Modal'
import Editable from './Editable'

interface TaskAddDialogProps {
  date?: string
  onRequestClose(): void
}

const Wrapper = styled.div`
  position: absolute;
  width: 98%;
  left: 1%;
  background: #fff;
  border-radius: 10px;
  height: 160px;
  padding-top: 20px;
  top: 80px;
  box-shadow: 0 0 10px ${props => props.theme.shadowColor};
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
  }

  & .description-input {
    margin-top: 10px;
    line-height: 1.4;
    flex: 1;
  }
`

const TitleInputStyle = css``

class TaskAddDialog extends React.Component<TaskAddDialogProps> {
  handleTitleChange = (str: string) => {
    console.log(str)
  }

  handleDescriptionChange = (str: string) => {
    //
  }

  render() {
    return (
      <Wrapper>
        <div className="input-items">
          <Editable
            placeholder="New To-Do"
            onChange={this.handleTitleChange}
            className="title-input"
          />
          <Editable
            placeholder="Notes"
            onChange={this.handleDescriptionChange}
            className="description-input"
          />
        </div>
      </Wrapper>
    )
  }
}

export default TaskAddDialog
