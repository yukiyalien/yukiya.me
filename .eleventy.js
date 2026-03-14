const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("icon.jpg");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("404.html");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("img");

  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/posts/*.md");
  });

  eleventyConfig.addFilter("jpDate", (dateObj) => {
    if (!dateObj) return "";

    // Eleventy は JS Date を渡してくるので JST に変換してから整形
    const dt = DateTime.fromJSDate(dateObj, { zone: "Asia/Tokyo" });
    if (!dt.isValid) return "";

    return dt.toFormat("yyyy-LL-dd (ccc) HH:mm");
  });

  eleventyConfig.addFilter("jpDateShort", (dateObj) => {
    if (!dateObj) return "";
    const dt = DateTime.fromJSDate(dateObj, { zone: "Asia/Tokyo" });
    if (!dt.isValid) return "";
    return dt.toFormat("yyyy-LL-dd (ccc)");
  });

  eleventyConfig.addFilter("excerpt", (html, maxLength = 120) => {
    if (!html) return "";
    const text = String(html).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "…";
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};

