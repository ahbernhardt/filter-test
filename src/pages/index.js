import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'
import Seo from '../components/seo'
import TicketsList from '../components/TicketsList/new'
import Header from '../components/header'
import headerImage from '../images/2223_Banner_ SingleGameTicketsonSale.jpg'

const IndexPage = () => {
  // set utms
  const [utmQuery, setUTMQuery] = useState(``)
  // const [memUTMQuery, setMemUTMQuery] = useState(``)

  const data = useStaticQuery(graphql`
     query {
      site {
        siteMetadata {
          title
        }
      }
      info: allInformationJson {
        nodes {
          single {
            pageName
            copy
            becomeMember
          }
        }
      }
     }
  `)

  // const becomeMemberCopy = data.info.nodes[0]['single'].becomeMember
  // const pageName = data.info.nodes[0]['single'].pageName

  useEffect(() => {
    if (
      typeof window !== `undefined` &&
      !window.location.search.includes('utm')
    ) {
      // setMemUTMQuery(
      //   '?utm_source=TW.WEB&utm_medium=TW.WEB.SGT&utm_campaign=2022-23+TW+FULL+MEMBERSHIP'
      // )
      setUTMQuery(
        '?utm_source=TW.WEB&utm_medium=TW.WEB.SGT&utm_campaign=2022-23+TW+SGT'
      )
    }
    if (
      typeof window !== `undefined` &&
      window.location.search.includes('utm')
    ) {
      setUTMQuery(window.location.search)
      // setMemUTMQuery(window.location.search)
    }
  }, [])

  return (
    <Layout>
      <Seo title="Timberwolves Single Game Tickets"/>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`}
              headerImage={headerImage}/>
      <TicketsList utmQuery={utmQuery} pageTitle="Single"/>
    </Layout>
  )
}

export default IndexPage
