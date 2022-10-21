module.exports = {
    siteMetadata: {
        siteUrl: `https://labs.theharvardadvocate.com`,
    },
    plugins: [
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `The Harvard Advocate Experimental Labs`,
                short_name: `AdvoLabs`,
                start_url: `/`,
                background_color: `#f7f0eb`,
                theme_color: `#a2466c`,
                display: `standalone`,
                icon: `src/images/icon.png`,
            },
        },
    ]
}