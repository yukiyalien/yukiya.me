const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData("currentYear", () => new Date().getFullYear());

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

    const dt =
      typeof dateObj === "string"
        ? DateTime.fromISO(dateObj).setZone("Asia/Tokyo")
        : DateTime.fromJSDate(dateObj, { zone: "Asia/Tokyo" });
    if (!dt.isValid) return "";

    return dt.toFormat("yyyy-LL-dd (ccc) HH:mm");
  });

  eleventyConfig.addFilter("jpDateShort", (dateObj) => {
    if (!dateObj) return "";
    const dt =
      typeof dateObj === "string"
        ? DateTime.fromISO(dateObj).setZone("Asia/Tokyo")
        : DateTime.fromJSDate(dateObj, { zone: "Asia/Tokyo" });
    if (!dt.isValid) return "";
    return dt.toFormat("yyyy-LL-dd (ccc)");
  });

  eleventyConfig.addFilter("excerpt", (html, maxLength = 120) => {
    if (!html) return "";
    const text = String(html).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "…";
  });

  eleventyConfig.addFilter("urlEncode", (str) =>
    encodeURIComponent(str != null ? String(str) : "")
  );

  /** パスから最後のセグメント（スラグ）を取得。パンくずの現在ページ表示用 */
  eleventyConfig.addFilter("pathSlug", (url) => {
    if (!url || typeof url !== "string") return "";
    const segments = url.replace(/\/+$/, "").split("/").filter(Boolean);
    return segments[segments.length - 1] || "";
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

