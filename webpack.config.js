var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './src/index.js',
    './src/app.css',

  ],
  output: {
    filename: 'dist/bundle.js',
    path: path.resolve(__dirname, 'dist')

  },
  devtool: "inline-source-map",
  devServer: {
    port: 3001,
    contentBase: 'public/',
    historyApiFallback: true
  },
  module: {
    rules: [
      {test: /\.js/, use: 'babel-loader'},
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract('css-loader'),
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader'
        }

        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles/app.css',
      allChunks: true
    })
  ]
};
