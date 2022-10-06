import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGift, faStar } from '@fortawesome/free-solid-svg-icons'

import TicketBtn from '../TicketBtn'
import { formatDate } from '../../utils/formatDate'

const Ticket = ({ game, utmQuery }) => {
  const [formattedDate, formattedGameTipoff] = formatDate(game)
  const today = new Date()
  const tipoff = game.htm !== 'TBD' ? new Date(game.htm) : 'TBD'
  // determine opponent regardless of if home or away
  const opponent = game.ac === 'Minneapolis' ? game.v : game.h

  return (
    (tipoff > today || tipoff === 'TBD' ? (
        <div
          className="flex flex-col border-[1px] border-gray-300 rounded-md shadow-md md:h-34 max-h-auto w-full relative mx-auto text-wolves-navy bg-white "
        >
          <div className="flex flex-row">
            {/* DATE/TIME */}
            <div
              id="date"
              className="flex flex-row items-start border-gray-300 justify-start border-r-[1px] w-1/4 order-1 relative"
            >
              <div
                className="flex flex-col flex-wrap py-4 px-2 text-center sm:text-left md:px-4 text-sm md:text-base uppercase">
                <h3 className="font-extrabold pb-1 leading-tight">
                  {formattedDate[0]}
                </h3>
                <h3 className="font-medium pb-1 leading-tight">
                  {formattedDate[1]}
                </h3>
                <h3 className="font-medium leading-tight">
                  {formattedGameTipoff}
                </h3>
              </div>
            </div>
            {/* OPPONENT */}
            <div
              id="opponent"
              className="flex flex-col justify-center items-center w-1/2 order-2 md:py-2"
            >
              <h4 className="uppercase font-bold text-xs">@ {game.an}</h4>
              <div className="flex flex-row">
                <div className="w-12 relative">
                  <img
                    src={`https://cdn.nba.com/logos/nba/${opponent.tid}/primary/L/logo.svg`}
                    alt=""
                    className="w-16"
                    width="64px"
                    height="64px"
                  />
                </div>
                <div className="flex flex-row px-2">
                  <div
                    className="flex flex-col justify-center uppercase text-sm sm:text-sm md:text-lg whitespace-nowrap">
                    <h4 className="font-medium">
                      {opponent.tc}
                    </h4>
                    <h4 className="font-ptBold font-bold">
                      {opponent.tn}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* BUY/WATCH BTN */}
            <div
              id="btn"
              className="flex flex-col justify-center items-center md:py-2 py-6 px-3 align-center mx-auto border-gray-300 border-l-[1px] w-1/4 order-3"
            >
              <TicketBtn game={game} utmQuery={utmQuery}/>
            </div>
          </div>

          {/* PROMOTIONS & THEME NIGHT*/}
          {game.promoText && game.themeNight
            ? (<div className="flex flex-col justify-start items-start border-t-[1px] border-gray-300 p-2">
              <h5 className="text-start text-sm uppercase leading-tight">
                  <span className="font-bold uppercase pl-1">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="w-3 mr-1"
                    />
                  </span>
                {game.themeNight}
              </h5>
              <h5 className="text-start text-sm uppercase leading-tight">
                    <span className="font-bold uppercase md:text-sm pl-1">
                      <FontAwesomeIcon icon={faGift} className="w-3 mr-1"/>
                      {game.promoTitle}{' '}
                    </span>
                {game.promoText}
              </h5>
            </div>)
            : (game.promoText !== undefined
                ? (<div className="flex flex-row justify-start items-center border-t-[1px] border-gray-300 p-2">
                  <h5 className="text-start text-sm uppercase leading-tight">
                <span className="font-bold uppercase md:text-sm pl-1">
                  <FontAwesomeIcon icon={faGift} className="w-3 mr-1"/>
                  {game.promoTitle}{' '}
                </span>
                    {game.promoText}
                  </h5>
                </div>)
                : game.themeNight !== undefined
                  ? (<div className="flex flex-row justify-start items-center border-t-[1px] border-gray-300 p-2">
                    <h5 className="text-start text-sm uppercase leading-tight">
                  <span className="font-bold uppercase pl-1">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="w-3 mr-1"
                    />
                  </span>
                      {game.themeNight}
                    </h5>
                  </div>)
                  : (<div className="flex flex-row justify-start items-center border-t-[1px] border-gray-300"/>)
            )
          }
        </div>
      ) : null
    )
  )
}

export default Ticket
