const test = require("prettier-plugin-tailwindcss");

module.exports = {
    semi: true,
    tabWidth: 4,
    plugins: [test],
    pluginSearchDirs: ["."],
    overrides: [{ files: "*.svelte", options: { parser: "html" } }],
};
