module.exports = {
  siteMetadata: {
    title: `Hail Mary`,
    description: `A Soundboard for Football Games`,
    author: `@albatrocity`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-prefetch-google-fonts",
      options: {
        fonts: [{ family: "VT323" }],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Hail Mary`,
        short_name: `Hail Mary`,
        start_url: `/`,
        background_color: `#085927`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/images/football.png`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
        respectDNT: true,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
