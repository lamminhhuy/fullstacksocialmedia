// api/proxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

const options = {
  target: 'https://readchoiceapis2.onrender.com', // Địa chỉ URL của server mà bạn muốn proxy
  changeOrigin: true,
};

const proxy = createProxyMiddleware(options);

module.exports = (req, res) => {
  proxy(req, res);
};
