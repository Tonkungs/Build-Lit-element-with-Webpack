const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  // Tell Webpack which file kicks off our app.
  entry: path.resolve(__dirname, "src/my-app.js"),
  // Tell Weback to output our bundle to ./dist/bundle.js
  output: {
    filename: "my-app.js",
    path: path.resolve(__dirname, "dist")
  },
  // Tell Webpack which directories to look in to resolve import statements.
  // Normally Webpack will look in node_modules by default but since we’re overriding
  // the property we’ll need to tell it to look there in addition to the
  // bower_components folder.
  resolve: {
    modules: [path.resolve(__dirname, "node_modules")]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(
          __dirname,
          "node_modules/@webcomponents/webcomponentsjs/*.js"
        ),
        to: "node_modules/@webcomponents/webcomponentsjs/[name].[ext]"
      }
    ])
  ]
};
