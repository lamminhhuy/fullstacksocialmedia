const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://readchoiceapis2.onrender.com', // Thay thế bằng địa chỉ URL của API server
      changeOrigin: true,
    })
  );
};
