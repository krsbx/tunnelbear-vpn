// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-extraneous-dependencies
const path = require('path');

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-extraneous-dependencies
const CopyWebpackPlugin = require('copy-webpack-plugin');

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-extraneous-dependencies
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const assets = ['images']; // asset directories

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  ...assets.map((asset) => {
    return new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', asset),
          to: path.resolve(__dirname, '.webpack/renderer', asset),
        },
      ],
    });
  }),
];
