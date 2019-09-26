const buildHelper = require('./config/buildHelpers');

const developmentBuild = {
	module: buildHelper.getModule(false),
	plugins: buildHelper.getPlugins(false),
	devServer: buildHelper.getServer(),
};

const productionBuild = {
	module: buildHelper.getModule(true),
	plugins: buildHelper.getPlugins(true),
	// optimization: buildHelper.getOptimization(),
};

module.exports = function(env) {
	if (env.NODE_ENV !== 'production') {
		return developmentBuild;
	}
		return productionBuild;
};