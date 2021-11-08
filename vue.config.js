module.exports = {
  transpileDependencies: ['vuetify'],
  pluginOptions: {
    apollo: {
      lintGQL: false,
    },
  },
  chainWebpack: (config) => {
    // GraphQL Loader
    config.module
      .rule('graphql')
      .test(/\.graphql$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end()
      // Add another loader
      .use('other-loader')
      .loader('other-loader')
      .end();
  },
};
