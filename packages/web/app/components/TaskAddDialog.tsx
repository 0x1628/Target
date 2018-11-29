import * as React from 'react'
import styled from 'shared/styled'
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
`

class TaskAddDialog extends React.Component<TaskAddDialogProps> {
  render() {
    return (
      <Wrapper>
        <div>
          <Editable />
        </div>
      </Wrapper>
    )
  }
}

export default TaskAddDialog
