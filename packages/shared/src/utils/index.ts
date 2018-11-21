export function getSpDate(date?: string | Date | number, increment?: number): string {
  if (!date) {
    date = new Date()
  } else if (typeof date === 'string') {
    const [year, month, day] = date.split('-').map(Number)
    date = new Date()
    date.setFullYear(year)
    date.setMonth(month - 1)
    date.setDate(day)
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
  } else if (typeof date === 'number') {
    date = new Date(date)
  }
  if (increment) {
    date = date.valueOf()
    date += increment * 24 * 3600000
    date = new Date(date)
  }
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}\
-${date.getDate().toString().padStart(2, '0')}`
}
