module.exports = {
  entry: "./scripts/app.js",
  output: {
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: {cacheDirectory: true, presets: ['es2015', 'react']}},
      { test: /\.sass$/, loader: 'style-loader!css-loader!sass-loader?indentedSyntax' },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  }
};