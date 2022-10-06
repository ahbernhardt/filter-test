import React from 'react'
import { Script } from 'gatsby'

export const wrapRootElement = ({ element }) => {
  return (
    <>
      {element}
      <Script src="https://www.nba.com/_teams/include/embed.js"/>
    </>
  )
}
