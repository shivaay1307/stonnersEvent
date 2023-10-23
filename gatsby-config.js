module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "videos",
        path: `${__dirname}/src/data/`,
      },
    },
    "gatsby-transformer-remark",
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        mergeSecurityHeaders: true,
        headers: {
          "/*": [
            "Cache-Control: public, max-age=31536000, immutable",
          ],
          "/static/*": [
            "Cache-Control: public, max-age=31536000, immutable",
          ],
          "/images/*": [
            "Cache-Control: public, max-age=31536000, immutable",
          ],
          "/js/*": [
            "Cache-Control: public, max-age=31536000, immutable",
          ],
          "/css/*": [
            "Cache-Control: public, max-age=31536000, immutable",
          ],
          "/fonts/*": [
            "Cache-Control: public, max-age=31536000, immutable",
          ],
        },
      },
    },
  ],
};
