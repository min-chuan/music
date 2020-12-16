
module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:3000',
          pathRewrite: { '^/api': '' },
          changeOrigin: true,
          secure: true
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.(html)$/,
          exclude: /node_modules/,
          use: {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        }
      ]
    }
  }
}
