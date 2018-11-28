import * as React from 'react'
import styled from 'shared/styled'
import {dateSign} from 'shared/styled/elements'

interface DateSignProps {
  date: string
}

const Wrapper = styled.div`
${dateSign}
`

const DateSign: React.FunctionComponent<DateSignProps> = ({date}) => {
  return (
    <Wrapper>{date}</Wrapper>
  )
}

export default DateSign
