const env = process.env.NODE_ENV;

const presets = ["@babel/preset-react"];
const plugins = [
    "@babel/plugin-proposal-class-properties",
    ["@babel/plugin-proposal-decorators", {legacy: true}],
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-json-strings",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-throw-expressions",
    '@babel/plugin-proposal-object-rest-spread',
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta"
];

if (env === "test") {
    presets.unshift([
        "@babel/preset-env",
        {
            targets: { node: "current" }
        }
    ]);
}

if (env === "production") {
    presets.unshift([
        "@babel/preset-env",
        {
            targets: {node: 6, browsers: ["> 1%"]},
            modules: false
        }
    ]);

}

module.exports = { presets, plugins };
