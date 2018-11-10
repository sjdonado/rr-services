const path = require('path');
const Dotenv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = env => ({
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  plugins: [
    new Dotenv(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env'],
          },
        },
      },
    ],
  },
  mode: env.production ? 'production' : 'development',
  externals: [nodeExternals()],
});
