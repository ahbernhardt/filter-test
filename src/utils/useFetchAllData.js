import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetchAllData = pageName => {
  // fetch airtable promos and NBA schedule feed
  const [allSeasonGames, setAllSeasonGames] = useState([])
  const [airtableGames, setAirtableGames] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const year = 2022
  const season = '02'
  const routeName = 'single'
  // const routeName = pageName?.split(' ').join('').toLowerCase()

  const airtableProxyUrl = `https://contest.wolveslynx.com/pubtable/read.php?route=${routeName}`
  const nbaMobileFeedUrl = `https://data.nba.com/data/v2015/json/mobile_teams/nba/${year}/teams/timberwolves_schedule_${season}.json`
  // const nbaMobileFeedUrl = `https://data.nba.com/data/v2022/json/mobile_teams/nba/${year}/teams/timberwolves_schedule_${season}.json`

  useEffect(() => {
    const fetchAllData = async () => {
      const nbaMobileFeedData = await axios.get(nbaMobileFeedUrl)
      const airtablePromoData = await axios.get(airtableProxyUrl)

      axios
        .all([nbaMobileFeedData, airtablePromoData])
        .then(
          axios.spread((...responses) => {
            const nbaResponse = responses[0]
            const airtableResponse = responses[1]
            setAllSeasonGames(nbaResponse.data.gscd.g)
            setAirtableGames(airtableResponse.data.data)
          })
        )
        .catch(err => {
          console.error(err.code)
          console.error(err.message)
          setIsError(true)
        })
      setIsLoading(false)
    }
    fetchAllData()
  }, [airtableProxyUrl, nbaMobileFeedUrl])
  return { allSeasonGames, airtableGames, isLoading, isError }
}

export default useFetchAllData
