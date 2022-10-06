import { format, parseISO } from 'date-fns'

export const formatLongDate = game => {

  const longDateOptions = {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }
  let formattedLongDate
  if (game.htm == null) {
    return
  } else if (game.htm === 'TBD') {
    formattedLongDate = format(parseISO(game.gdte), 'eeee, MMMM d').split(',')
  } else {
    formattedLongDate = new Date(game.htm)
      .toLocaleDateString('en-US', longDateOptions)
      .split(',')
  }

  return [formattedLongDate]
}
