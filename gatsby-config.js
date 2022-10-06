module.exports = {
  pathPrefix: `/timberwolves/single/`,
  assetPrefix: `https://cdn.nba.com/teams/static/`,
  siteMetadata: {
    title: `Timberwolves Single Game Tickets`,
    description: `Timberwolves.com: The ONLY place to buy authentic tickets.`,
    author: `Minnesota Digital Innovation`,
    siteUrl: `https://nba.com/timberwolves/single`,
    image: `../images/2223_Banner_ SingleGameTicketsonSale.jpg`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `info`,
        path: `${__dirname}/src/data`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-transformer-json`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        mode: `render-blocking`,
        preconnect: [`https://use.typekit.net`],
        web: [
          {
            name: `futura`,
            file: `https://use.typekit.net/izc8fii.css`,
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-WT7PQJ2',
        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `tw22-single`,
        short_name: `single`,
        start_url: `/`,
        background_color: `#0C2340`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#0C2340`,
        display: `minimal-ui`,
        icon: `src/images/timberwolves.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
