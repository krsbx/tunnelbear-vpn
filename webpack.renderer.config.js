// eslint-disable-next-line @typescript-eslint/no-var-requires
const rules = require('./webpack.rules');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugins = require('./webpack.plugins');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};
