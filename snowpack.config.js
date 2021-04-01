const proxy = require('http2-proxy');

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  plugins: [
    /* ... */
  ],
  routes: [
    {
      src: '/api/.*',
      dest: (req, res) => {
        req.url = req.url.replace(/^\/api/, '');

        return proxy.web(req, res, {
          hostname: 'localhost',
          port: 3001,
        });
      },
    },
  ],
  devOptions: {
    secure: true,
  },
};
