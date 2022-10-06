/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react'
import PropTypes from 'prop-types'
import '@progress/kendo-theme-default/dist/all.css';
import './layout.css'

const Layout = ({ children }) => {
  return (
    <>
      <div id="nba-nav" data-team="timberwolves"/>
      <main className="bg-wolves-offwhite">{children}</main>
      <div id="nba-footer" data-team="timberwolves"/>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
