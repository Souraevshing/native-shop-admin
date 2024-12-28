// next-sitemap.config.js
module.exports = {
  siteUrl: "https://native-shop-admin.vercel.app/",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "Googlebot", disallow: "/private" },
    ],
  },
  exclude: ["/private", "/hidden"],
};
