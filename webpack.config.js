let path = require('path')
let webpack = require('webpack')
let WebpackNotifierPlugin = require('webpack-notifier')
let ExtractTextPlugin = require("extract-text-webpack-plugin")
// let configJSON = require('./client.json')
let fs = require("file-system")

const extractSass = new ExtractTextPlugin({
  filename: 'styles.css',
});

module.exports = {
  devtool: 'source-map',
//   context: path.resolve(__dirname, 'src'),  
  entry: {
    bundle: ['./src/index'],
  },

  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
    publicPath: '/'
  },

  resolve: {
    moduleExtensions: ['*', '.json', '.js', '.jsx'],
    modules: [
      'node_modules'
    ]
  },



  module: {
    noParse: /node_modules\/quill\/dist/,
    rules: [
      {
        test: /\.css$/,
        // use: ExtractTextPlugin.extract("style-loader", "css-loader")
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },{
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          }],
        }),
      },
      {
        test: /\.js$/,
        exclude: /node-modules/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src')
      },
      { include: /\.json$/, use: ["json-loader"] },
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/",
    hotOnly: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      '__DEV__': true,
      '__TEST__': false
    }),
    new WebpackNotifierPlugin(),
    new ExtractTextPlugin("styles.css")
  ],
//   externals: {
//     'ClientConfigs': JSON.stringify(configJSON)
//   }
}
