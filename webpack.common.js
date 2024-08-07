const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSVGPlugin = require("html-webpack-inline-svg-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const svgToMiniDataURI = require("mini-svg-data-uri");

module.exports = {
  entry: {
    main: ["./src/index.js", "./src/styles.scss"]
  },
  output: {
    filename: "scripts/[name].min.js",
    path: path.resolve(__dirname, "dist"),
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new HtmlWebpackInlineSVGPlugin({
      inlineAll: true
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map[query]"
    }),
    new MiniCssExtractPlugin({
      filename: "styles/[name].min.css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader"
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|img|svg|jpg|jpeg|gif|ico)$/i,
        oneOf: [
          {
            resourceQuery: /inline/,
            type: "asset/inline",
            generator: {
              dataUrl: (content) => {
                content = content.toString();
                return svgToMiniDataURI(content);
              }
            }
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
