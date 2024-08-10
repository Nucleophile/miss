const path = require("path");
const webpack = require("webpack");
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

module.exports = {
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true
  },
  plugins: [
    new HtmlBundlerPlugin({
      preprocessor: "pug",
      entry: {
        index: './src/index.pug',
      },
      js: {
        filename: 'scripts/main.min.js',
      },
      css: {
        filename: 'styles/main.min.css',
      },
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map[query]"
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["css-loader", "sass-loader"]
      },
      {
        test: /\.(png|img|svg|jpg|jpeg|gif|ico)$/i,
        oneOf: [
          {
            resourceQuery: /inline/,
            type: "asset/inline"
          },
          {
            type: "asset/resource",
            generator: {
              filename: "images/[name][ext]"
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]"
        }
      }
    ]
  }
};
