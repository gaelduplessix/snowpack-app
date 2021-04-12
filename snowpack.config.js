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
    {
      src: '/ws',
      upgrade: (req, socket, head) => {
        console.log('Upgrade handler');
        socket.on('close', () => {
          console.log('Socket closed');
        });
        const defaultWSHandler = (err, req, socket, head) => {
          if (err) {
            console.error('proxy error', err);
            socket.destroy();
          }
        };

        proxy.ws(
          req,
          socket,
          head,
          { hostname: 'localhost', port: 3002 },
          defaultWSHandler,
        );
      },
    },
  ],
  devOptions: {
    secure: true,
  },
};
