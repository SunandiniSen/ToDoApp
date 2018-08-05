const path = require('path');
let webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin'); 

const paths = {
  SRC: path.resolve(__dirname, 'src')
};

module.exports = {
  entry: path.join(paths.SRC, '/index'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
  },
  
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.bundle.css'), 
  ],
  
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader',
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
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
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};