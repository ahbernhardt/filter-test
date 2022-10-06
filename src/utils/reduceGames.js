// helper function to take all the airtable games and NBA feed games and reduce them to only games in the airtable, concatonated together with all the data from both the airtable list and the feed for the TicketList component

export const reduceGames = (allSeasonGames, airtableGames) => {
  // compare all season games from feed with promo night games from airtable
  const comparedGames = allSeasonGames.filter(seasonGame =>
    airtableGames?.some(airtableGame => airtableGame.gid === seasonGame.gid)
  )

  // add any properties from fetched data to the new promo games array
  const mappedArray = airtableGames?.reduce((acc, curr) => {
    acc[curr.gid] = curr
    return acc
  }, {})

  const allPromoGames = comparedGames.map(game =>
    Object.assign(game, mappedArray[game.gid])
  )
  return allPromoGames
}
