const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  //const  HtmlWebpackPlugin  = require('html-webpack-plugin') ; 


  if (env.mode === 'production') {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        path: 'web-report',
      })
    );
  }

  // config.plugins.push(
  //   new HtmlWebpackPlugin({
  //     favicon: "./assets/images/favicon.ico" 
  //   })
  // )

  return config;
};
