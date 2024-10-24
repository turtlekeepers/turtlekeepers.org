// https://www.11ty.dev/docs/config/

const inputDir = "src"; // default: "."
const outputDir = "dist"; // default: "_site"
const layoutsDir = "_layouts"; // default: "_layouts" (`input` relative)

export default async function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy(`${inputDir}/CNAME`);
};

export const config = {
  dir: {
    input: inputDir,
    output: outputDir,
    layouts: layoutsDir
  }
};
