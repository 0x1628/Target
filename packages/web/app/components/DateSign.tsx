import * as React from 'react'

interface DateSignProps {
  date: string
}

const DateSign: React.SFC<DateSignProps> = ({date}) => {
  return (
    <div>{date}</div>
  )
}

export default DateSign
