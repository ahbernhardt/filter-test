import React from 'react'

const TicketBtn = ({ game, utmQuery }) => {
  return game.url ? (
    <a
      href={`${game.url}${utmQuery}`}
      target="_blank"
      rel="noreferrer"
      className={`uppercase border-[2px] border-wolves-aurora font-bold text-xs sm:text-base p-2 w-full items-center inline-flex rounded-full justify-center text-center ease-out duration-200 hover:no-underline ${
        game.ac === 'Minneapolis'
          ? 'hover:text-wolves-navy bg-wolves-aurora hover:bg-transparent text-wolves-navy'
          : 'hover:text-wolves-navy bg-transparent hover:bg-wolves-aurora text-white'
      } `}
    >
      {game.cta}
    </a>
  ) : game.isDisabled ? (
    <button
      aria-disabled
      disabled
      className="font-ptBold uppercase border-1 border-wolves-navy bg-gray-300 text-wolves-navy font-bold text-xs sm:text-base p-2 w-full items-center inline-flex rounded-full justify-center text-center ease-out duration-200 hover:no-underline pointer-events-none"
    >
      {game.cta}
    </button>
  ) : null
}

export default TicketBtn
