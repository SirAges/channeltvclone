/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_DOMAIN,
    exclude: [],
    robotsTxtOptions: {
        additionalSitemaps: [
            process.env.NEXT_PUBLIC_DOMAIN+"/sitemap.xml"
        ]
    },
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                allow: "/"
            }
        ]
    }
};
