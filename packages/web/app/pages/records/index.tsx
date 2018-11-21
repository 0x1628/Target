import * as React from 'react'
import RecordContainer from 'shared/containers/RecordContainer'
import {getSpDate} from 'shared/utils'
import {EasyReactRouterComponentProps} from '../../easy-react-router'
import DateSign from '../../components/DateSign'

const RecordsIndex: React.SFC<EasyReactRouterComponentProps> = ({path}) => {
  const currentDate = path ? path[0] : getSpDate()

  return <RecordContainer date={currentDate}>
    {({tasks}) => (
      <>
        <DateSign date={currentDate} />
        <div>Record container {tasks.length}</div>
      </>
    )}
  </RecordContainer>
}

export default RecordsIndex
