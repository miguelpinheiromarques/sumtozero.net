const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const htmlmin = require("html-minifier");
const { I18nPlugin } = require("@11ty/eleventy");
const i18n = require('./src/_data/i18n.js');

module.exports = function (eleventyConfig) {
  // Set your primary language
  eleventyConfig.addPlugin(I18nPlugin, {
    defaultLanguage: "en",
  });

  eleventyConfig.addFilter("t", function(key) {
    const lang = this.page.lang || 'en'; // Detect current page language
    return i18n[key][lang] || key; // Return translation or the key itself if missing
  });

  // Redirect to homepage  
  eleventyConfig.addPassthroughCopy("src/_redirects");  

eleventyConfig.addCollection("posts_en", function(collectionApi) {
  return collectionApi.getAll().filter(item => 
    item.url.startsWith("/en/posts/") && !item.url.endsWith("/posts/")
  );
});

eleventyConfig.addCollection("posts_pt", function(collectionApi) {
  return collectionApi.getAll().filter(item => 
    item.url.startsWith("/pt/posts/") && !item.url.endsWith("/posts/")
  );
});

// Filter to find a page by translationKey and language
  eleventyConfig.addFilter("getLocalizedUrl", function(translationKey, targetLang, allPages) {
    // If there is no translation key, we can't link them
    if (!translationKey) return null;

    // Search through ALL pages to find the match
    const match = allPages.find(item => 
      item.data.translationKey === translationKey && 
      item.data.lang === targetLang
    );
    
    return match ? match.url : null;
  });
  
  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  // human readable date
    eleventyConfig.addFilter("readableDate", (dateObj, lang) => {
    // 1. If date is missing, return empty
    if (!dateObj) return "";

    // 2. Map your short language codes to full locale codes
    // 'pt' -> 'pt-PT' (Portugal) or 'pt-BR' (Brazil)
    const localeMap = {
      en: "en-US",
      pt: "pt-PT" 
    };

    // 3. Get the correct locale (default to English if missing)
    const locale = localeMap[lang] || "en-US";

    // 4. Format the date using native JavaScript
    return new Date(dateObj).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // Copy CSS to route of /_site  
  eleventyConfig.addPassthroughCopy("./src/static/css");
  
  // Copy Image Folder to /_site
  eleventyConfig.addPassthroughCopy("./src/static/img");

  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy("./src/static/favicon.ico");
  eleventyConfig.addPassthroughCopy("./src/static/favicon.svg");  
  eleventyConfig.addPassthroughCopy("./src/static/apple-touch-icon.png");  

  // Copy robots to route of /_site  
  eleventyConfig.addPassthroughCopy("./src/static/robots.txt");  

  // Add the global variable "year"
  eleventyConfig.addGlobalData("year", () => {
    return new Date().getFullYear();
  });

  // Minify HTML
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  return {
    dir: {
      input: "src",
    },
    htmlTemplateEngine: "njk",
  };
};
