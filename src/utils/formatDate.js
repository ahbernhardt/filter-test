import { format, parseISO } from 'date-fns'

// date format helper to format game tipoff to date and time + deal with times that are null or 'TBD' in the league feed
export const formatDate = game => {
  const dateOptions = {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  }

  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
  }

  let formattedDate
  let formattedGameTipoff

  if (game.htm == null) {
    return
  } else if (game.htm === 'TBD') {
    formattedDate = format(parseISO(game.gdte), 'eeee, MMMM d').split(',')
    formattedGameTipoff = 'TBD'
  } else {
    formattedDate = new Date(game.htm)
      .toLocaleDateString('en-US', dateOptions)
      .split(',')
    let formattedTime = new Date(game.htm).toLocaleDateString(
      'en-US',
      timeOptions
    )
    formattedGameTipoff = `${formattedTime.split(',')[1]} CDT`
  }

  return [formattedDate, formattedGameTipoff]
}
