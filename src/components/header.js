import * as React from 'react'

const Header = ({ headerImage }) => {
  return (
    <header>
      <img
        src={headerImage}
        alt="Timberwovles.com - The only place to buy authetic tickets"
        className="w-full h-auto object-cover max-w-full"
        formats={['auto', 'webp']}
        loading="eager"
      />
    </header>
  )
}

export default Header
