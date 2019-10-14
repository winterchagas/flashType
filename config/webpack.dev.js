const buildHelper = require('./buildHelpers');

module.exports = {
  mode: 'development',
  entry: buildHelper.getEntry(),
  output: buildHelper.getOutput(false),
  module: buildHelper.getModule(false),
  plugins: buildHelper.getPlugins(false),
  devServer: buildHelper.getServer(),
  devtool: 'eval'
};