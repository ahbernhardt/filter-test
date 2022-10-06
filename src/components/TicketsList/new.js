import React, { useEffect, useMemo, useState } from 'react'
import Ticket from '../Ticket'
import useFetchAllData from '../../utils/useFetchAllData'
import { reduceGames } from '../../utils/reduceGames'
import { formatLongDate } from '../../utils/formatLongDate'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import SelectBox from "./SelectBox"

const TicketList = ({ utmQuery }) => {
  // fetch data and reduce the games to only the promo games & sort
  const { allSeasonGames, airtableGames, isLoading } = useFetchAllData()
  const allPromoGames = reduceGames(allSeasonGames, airtableGames).sort((a, b) => a.gid - b.gid)
  const [teamList, setTeamsList] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const teamsName = [
    { id: 1, value: '', label: 'Team' }, {id: 2, value: '76ers', label: '76ers' },
    { id: 3, value: 'Bucks', label: 'Bucks' }, {id: 4, value: 'Bulls', label: 'Bulls' },
    { id: 5, value: 'Cavaliers', label: 'Cavaliers' }, {id: 6, value: 'Celtics', label: 'Celtics' },
    { id: 7,value: 'Clippers', label: 'Clippers' }, { id: 8,value: 'Grizzlies', label: 'Grizzlies' },
    { id: 9,value: 'Hawks', label: 'Hawks' }, { id: 10,value: 'Heat', label: 'Heat' },
    { id: 11,value: 'Hornets', label: 'Hornets' }, { id: 12,value: 'Jazz', label: 'Jazz' },
    { id: 13, value: 'Kings', label: 'Kings' }, { id: 14,value: 'Knicks', label: 'Knicks' },
    { id: 15,value: 'Lakers', label: 'Lakers' }, { id: 16,value: 'Magic', label: 'Magic' },
    { id: 17,value: 'Mavericks', label: 'Mavericks' }, { id: 18,value: 'Nets', label: 'Nets' },
    { id: 19,value: 'Nuggets', label: 'Nuggets' }, { id: 20,value: 'Pacers', label: 'Pacers' },
    { id: 21,value: 'Pelicans', label: 'Pelicans' }, { id: 22,value: 'Pistons', label: 'Pistons' },
    { id: 23,value: 'Raptors', label: 'Raptors' }, { id: 24,value: 'Rockets', label: 'Rockets' },
    { id: 25,value: 'Spurs', label: 'Spurs' }, { id: 26,value: 'Suns', label: 'Suns' },
    { id: 27,value: 'Thunder', label: 'Thunder' }, { id: 28,value: 'Trail Blazers', label: 'Trail Blazers' },
    { id: 29,value: 'Warriors', label: 'Warriors' }, { id: 30,value: 'Wizards', label: 'Wizards' },
  ]
  const filterMonths = [
    { id: 1, value: '', label: 'Month' }, { id: 2,value: 'October', label: 'October' },
    { id: 3,value: 'November', label: 'November' }, { id: 4,value: 'December', label: 'December' },
    { id: 5,value: 'January', label: 'January' }, { id: 6,value: 'February', label: 'February' },
    { id: 7,value: 'March', label: 'March' }, { id: 8,value: 'April', label: 'April' },
  ]
  const filterDays = [
    { id: 1,value: '', label: 'Day' }, { id: 2,value: 'Monday', label: 'Monday' },
    { id: 3,value: 'Tuesday', label: 'Tuesday' }, { id: 4,value: 'Wednesday', label: 'Wednesday' },
    { id: 5,value: 'Thursday', label: 'Thursday' }, { id: 6,value: 'Friday', label: 'Friday' },
    { id: 7,value: 'Saturday', label: 'Saturday' }, { id: 8,value: 'Sunday', label: 'Sunday' },
  ]
  const filterGiveaway = [
    { id: 1, value: '', label: 'Giveaway' },
    { id: 2, value: 'yes', label: 'Yes' },
    { id: 3, value: 'no', label: 'No' },
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
      <div className="flex flex-col lg:flex-row border-[1px] border-gray-300 rounded-md shadow-md w-full py-2 px-4 md:w-2/3 mx-auto text-wolves-navy justify-center items-center">
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
        <div className="w-full flex flex-col mt-3 sm:mt-0 mb-4">
           <div className="w-full flex flex-row mt-2">
             <SelectBox
                items={teamsName}
                setTeamsList={setTeamsList}
             />
             <SelectBox
                items={filterMonths}
                setTeamsList={setTeamsList}
             />


           </div>
        </div>
      </div>
      <div id="tickets__list"
               className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 px-3 sm:px-4 md:px-2">
        {games.map(game => (
            <Ticket
              key={game.gid}
              game={game}
              utmQuery={utmQuery}
              isLoading={isLoading}
              className="k-listgroup-item"
            />
        ))}
      </div>
    </section>
  )
}

export default TicketList

//          <div className="w-full font-bold mb-[4px]">
//            Filter by:
//          </div>
 {/* All Filters Wrapper*/}
//          <div className="w-full flex flex-col xs:flex-row gap-x-2 mx-auto">
//            {/* Team Dropdown*/}
//            <div className="w-full relative">
//              <span
//                className="w-5 h-5 pl-1 text-white bg-wolves-aurora absolute top-0 right-0 mr-[2px] my-[5px] pointer-events-none rounded">
//                <FontAwesomeIcon
//                  icon={faChevronDown}
//                  className="w-3 h-5"
//                />
//              </span>
//              <select
//                className="mx-[3px] w-full text-base md:text-lg rounded border-[1px] border-gray-300 text-gray-600 pl-[4px] py-[2px] md:pl-2  md:py-0 bg-white hover:border-wolves-aurora focus:outline-wolves-aurora appearance-none"
//                value={teamList}
//                onChange={(e) => setTeamsList(e.target.value)}
//              >
//                {teamsName.map((team, i) => {
//                  return (
//                    <option key={i} value={team.value}>
//                      {team.label}
//                    </option>
//                  )
//                })}
//              </select>
//            </div>
//
//            {/* MONTHS */}
//            <div className="w-full relative">
//              <span
//                className="w-5 h-5 pl-1 text-white bg-wolves-aurora absolute top-0 right-0 mr-[2px] my-[5px] pointer-events-none rounded">
//                <FontAwesomeIcon
//                  icon={faChevronDown}
//                  className="w-3 h-5"
//                />
//              </span>
//              <select
//                className="mx-[3px] w-full text-base md:text-lg rounded border-[1px] border-gray-300 text-gray-600 pl-[4px] py-[2px] md:pl-2 md:py-0 bg-white hover:border-gray-400 focus:outline-none appearance-none"
//                value={teamList}
//                onChange={(e) => setTeamsList(e.target.value)}
//              >
//                {filterMonths.map((month, i) => {
//                  return (
//                    <option key={i} value={month.value}>
//                      {month.label}
//                    </option>
//                  )
//                })}
//              </select>
//            </div>
//
//            {/* DAY */}
//            <div className="w-full relative">
//              <span
//                className="w-5 h-5 pl-1 text-white bg-wolves-aurora absolute top-0 right-0 mr-[2px] my-[5px] pointer-events-none rounded">
//                <FontAwesomeIcon
//                  icon={faChevronDown}
//                  className="w-3 h-5"
//                />
//              </span>
//              <select
//                className="ml-[3px] w-full text-base md:text-lg rounded border-[1px] border-gray-300 text-gray-600 pl-[4px] py-[2px] md:pl-2 md:py-0 bg-white hover:border-gray-400 focus:outline-none appearance-none"
//                value={teamList}
//                onChange={(e) => setTeamsList(e.target.value)}
//              >
//                {filterDays.map((day, i) => {
//                  return (
//                    <option key={i} value={day.value}>
//                      {day.label}
//                    </option>
//                  )
//                })}
//              </select>
//            </div>
//
//            {/* GIVEAWAY */}
//            <div className="w-full relative">
//              <span
//                className="w-5 h-5 pl-1 text-white bg-wolves-aurora absolute top-0 right-0 mr-[2px] my-[5px] pointer-events-none rounded">
//                <FontAwesomeIcon
//                  icon={faChevronDown}
//                  className="w-3 h-5"
//                />
//              </span>
//              <select
//                className="ml-[3px] w-full text-base md:text-lg rounded border-[1px] border-gray-300 text-gray-600 pl-[4px] py-[2px] md:pl-2 md:py-0 bg-white hover:border-gray-400 focus:outline-none appearance-none"
//                value={teamList}
//                onChange={(e) => setTeamsList(e.target.value)}
//              >
//                {filterGiveaway.map((away, i) => {
//                  return (
//                    <option key={i} value={away.value}>
//                      {away.label}
//                    </option>
//                  )
//                })}
//              </select>
//            </div>
//          </div>
//        </div>
//      </div>
//
//
//      <div id="tickets" className="absolute top-[-5rem]"/>
//      <div className="max-w-6xl mx-auto pt-8 md:pt-12">
//        <h2
//          className="text-3xl md:text-4xl mx-4 pb-4 md:pb-8 font-[800] italic tracking-wide font-ptCond uppercase text-wolves-navy text-center">
//            <span className="shadow-[inset_0_-1rem_0_0_#78BE20] md:shadow-[inset_0_-1.2rem_0_0_#78BE20] px-1 md:px-2">
//              All Single Game Tickets Available
//            </span>
//        </h2>
//
//        <div id="tickets__list"
//             className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 px-3 sm:px-4 md:px-2">
//          {games.map(game => (
//            <Ticket
//              key={game.gid}
//              game={game}
//              utmQuery={utmQuery}
//              isLoading={isLoading}
//            />
//          ))}
//        </div>