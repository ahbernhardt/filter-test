import React, { useEffect, useMemo, useState } from 'react'
import Ticket from '../Ticket'
import useFetchAllData from '../../utils/useFetchAllData'
import { reduceGames } from '../../utils/reduceGames'
import { formatLongDate } from '../../utils/formatLongDate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const TicketList = ({ utmQuery }) => {
  // fetch data and reduce the games to only the promo games & sort
  const { allSeasonGames, airtableGames, isLoading } = useFetchAllData()
  const allPromoGames = reduceGames(allSeasonGames, airtableGames).sort((a, b) => a.gid - b.gid)
  const [teamList, setTeamsList] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const teamsName = [
    { value: '', label: 'Team' }, { value: '76ers', label: '76ers' },
    { value: 'Bucks', label: 'Bucks' }, { value: 'Bulls', label: 'Bulls' },
    { value: 'Cavaliers', label: 'Cavaliers' }, { value: 'Celtics', label: 'Celtics' },
    { value: 'Clippers', label: 'Clippers' }, { value: 'Grizzlies', label: 'Grizzlies' },
    { value: 'Hawks', label: 'Hawks' }, { value: 'Heat', label: 'Heat' },
    { value: 'Hornets', label: 'Hornets' }, { value: 'Jazz', label: 'Jazz' },
    { value: 'Kings', label: 'Kings' }, { value: 'Knicks', label: 'Knicks' },
    { value: 'Lakers', label: 'Lakers' }, { value: 'Magic', label: 'Magic' },
    { value: 'Mavericks', label: 'Mavericks' }, { value: 'Nets', label: 'Nets' },
    { value: 'Nuggets', label: 'Nuggets' }, { value: 'Pacers', label: 'Pacers' },
    { value: 'Pelicans', label: 'Pelicans' }, { value: 'Pistons', label: 'Pistons' },
    { value: 'Raptors', label: 'Raptors' }, { value: 'Rockets', label: 'Rockets' },
    { value: 'Spurs', label: 'Spurs' }, { value: 'Suns', label: 'Suns' },
    { value: 'Thunder', label: 'Thunder' }, { value: 'Trail Blazers', label: 'Trail Blazers' },
    { value: 'Warriors', label: 'Warriors' }, { value: 'Wizards', label: 'Wizards' },
  ]
  const filterMonths = [
    { value: '', label: 'Month' }, { value: 'October', label: 'October' },
    { value: 'November', label: 'November' }, { value: 'December', label: 'December' },
    { value: 'January', label: 'January' }, { value: 'February', label: 'February' },
    { value: 'March', label: 'March' }, { value: 'April', label: 'April' },
  ]
  const filterDays = [
    { value: '', label: 'Day' }, { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' }, { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' }, { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' }, { value: 'Sunday', label: 'Sunday' },
  ]
  const filterGiveaway = [
    { value: '', label: 'Giveaway' },
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ]

  const games = useMemo(() => {
    if (teamList === '') {
      if (searchInput === '') {
        return allPromoGames
      } else {
        return allPromoGames.filter((game) => {
          const visitorN = game.v.tn
          const visitorC = game.v.tc
          const searchFields =
            `${visitorN.toLowerCase()}` +
            `${visitorC.toLowerCase()}`
          return searchFields.includes(searchInput.toLowerCase())
        })
      }
    }
    return allPromoGames.filter((game) => {
        const teams = game.v.tn
        const [formattedLongDate] = formatLongDate(game)
        const months = formattedLongDate[1].split(' ')
        const days = formattedLongDate[0]
        const giveAway = game.filterGiveAway
        return teams.includes(teamList) || months.includes(teamList) || days.includes(teamList) || giveAway.includes(teamList)
      }
    )
  }, [allPromoGames, teamList, searchInput])

  useEffect(() => {
    if (searchInput !== '') {
      setTeamsList('')
    }
  }, [searchInput])

  return (
    <section className="py-6">
      <div
        className="flex flex-col lg:flex-row border-[1px] border-gray-300 rounded-md shadow-md w-full py-2 px-4 md:w-2/3 mx-auto text-wolves-navy justify-center items-center">
        {/*Search Bar*/}
        <div className="w-full text-left mt-2">
          <input
            className="w-1/2 p-2 border-[1px] border-gray-300 rounded-md"
            name="searchTeam"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="w-full flex flex-col mt-3 sm:mt-0">
          <div className="w-full font-bold mb-[4px]">
            Filter by:
          </div>
          {/* All Filters Wrapper*/}
          <div className="w-full flex flex-col xs:flex-row gap-x-2 mx-auto">
            {/* Team Dropdown*/}
            <div className="w-full relative">
              <span
                className="w-5 h-5 pl-1 text-white bg-wolves-aurora absolute top-0 right-0 mr-[2px] my-[5px] pointer-events-none rounded">
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="w-3 h-5"
                />
              </span>
              <select
                className="mx-[3px] w-full text-base md:text-lg rounded border-[1px] border-gray-300 text-gray-600 pl-[4px] py-[2px] md:pl-2  md:py-0 bg-white hover:border-wolves-aurora focus:outline-wolves-aurora appearance-none"
                value={teamList}
                onChange={(e) => setTeamsList(e.target.value)}
              >
                {teamsName.map((team, i) => {
                  return (
                    <option key={i} value={team.value}>
                      {team.label}
                    </option>
                  )
                })}
              </select>
            </div>

            {/* MONTHS */}
            <div className="w-full relative">
              <span
                className="w-5 h-5 pl-1 text-white bg-wolves-aurora absolute top-0 right-0 mr-[2px] my-[5px] pointer-events-none rounded">
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="w-3 h-5"
                />
              </span>
              <select
                className="mx-[3px] w-full text-base md:text-lg rounded border-[1px] border-gray-300 text-gray-600 pl-[4px] py-[2px] md:pl-2 md:py-0 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                value={teamList}
                onChange={(e) => setTeamsList(e.target.value)}
              >
                {filterMonths.map((month, i) => {
                  return (
                    <option key={i} value={month.value}>
                      {month.label}
                    </option>
                  )
                })}
              </select>
            </div>

            {/* DAY */}
            <div className="w-full relative">
              <span
                className="w-5 h-5 pl-1 text-white bg-wolves-aurora absolute top-0 right-0 mr-[2px] my-[5px] pointer-events-none rounded">
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="w-3 h-5"
                />
              </span>
              <select
                className="ml-[3px] w-full text-base md:text-lg rounded border-[1px] border-gray-300 text-gray-600 pl-[4px] py-[2px] md:pl-2 md:py-0 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                value={teamList}
                onChange={(e) => setTeamsList(e.target.value)}
              >
                {filterDays.map((day, i) => {
                  return (
                    <option key={i} value={day.value}>
                      {day.label}
                    </option>
                  )
                })}
              </select>
            </div>

            {/* GIVEAWAY */}
            <div className="w-full relative">
              <span
                className="w-5 h-5 pl-1 text-white bg-wolves-aurora absolute top-0 right-0 mr-[2px] my-[5px] pointer-events-none rounded">
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="w-3 h-5"
                />
              </span>
              <select
                className="ml-[3px] w-full text-base md:text-lg rounded border-[1px] border-gray-300 text-gray-600 pl-[4px] py-[2px] md:pl-2 md:py-0 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                value={teamList}
                onChange={(e) => setTeamsList(e.target.value)}
              >
                {filterGiveaway.map((away, i) => {
                  return (
                    <option key={i} value={away.value}>
                      {away.label}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
        </div>
      </div>


      <div id="tickets" className="absolute top-[-5rem]"/>
      <div className="max-w-6xl mx-auto pt-8 md:pt-12">
        <h2
          className="text-3xl md:text-4xl mx-4 pb-4 md:pb-8 font-[800] italic tracking-wide font-ptCond uppercase text-wolves-navy text-center">
            <span className="shadow-[inset_0_-1rem_0_0_#78BE20] md:shadow-[inset_0_-1.2rem_0_0_#78BE20] px-1 md:px-2">
              All Single Game Tickets Available
            </span>
        </h2>

        <div id="tickets__list"
             className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 px-3 sm:px-4 md:px-2">
          {games.map(game => (
            <Ticket
              key={game.gid}
              game={game}
              utmQuery={utmQuery}
              isLoading={isLoading}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TicketList
