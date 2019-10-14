const buildHelper = require('./buildHelpers');

module.exports = {
  mode: 'production',
  entry: buildHelper.getEntry(),
  output: buildHelper.getOutput(true),
  module: buildHelper.getModule(true),
  plugins: buildHelper.getPlugins(true),
  // optimization: buildHelper.getOptimization(),
  devtool: 'cheap-source-map'
};