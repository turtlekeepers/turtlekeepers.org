// https://www.11ty.dev/docs/config/
import * as sass from "sass";
import path from "node:path";

const inputDir = "src"; // default: "."
const outputDir = "dist"; // default: "_site"
const layoutsDir = "_layouts"; // default: "_layouts" (`input` relative)
const assetsDir = "_assets";

export default async function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy(`${inputDir}/robots.txt`);

  // SASS pipeline
  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compileOptions: {
      permalink: function (contents, inputPath) {
        // skip files not in assets
        if (!inputPath.includes(`/${assetsDir}/`)) {
          return;
        }

        let re = new RegExp(String.raw`\/${inputDir}\/_`, "g");

        return inputPath
          .replace(re, "/") // changes e.g. "/src/_assets" to "/assets"
          .replace(/\.scss$/, ".css");
      }
    },
    compile: function(contents, inputPath) {
      // skip files not in assets
      if (!inputPath.includes(`/${assetsDir}/`)) {
        return;
      }

      // skip partials (e.g. _normalize.scss)
      if (path.parse(inputPath).base.startsWith("_")) {
        return;
      }

      return (data) => {
        let result = sass.compile(inputPath, {
          style: "compressed"
        });

        return result.css.toString();
      }
    }
  });
};

export const config = {
  dir: {
    input: inputDir,
    output: outputDir,
    layouts: layoutsDir
  }
};
