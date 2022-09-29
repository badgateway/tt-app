#!/usr/bin/env node
const esbuild = require('esbuild');
const http = require('http');

// Start esbuild's server on a random local port
esbuild.serve({
  servedir: 'public/',
}, {
  bundle: true,
  outfile: 'public/script.js',
  entryPoints: ['src/app.tsx'],
}).then(result => {
  // The result tells us where esbuild's local server is
  const {host, port} = result

  // Then start a proxy server on port 3000
  http.createServer((req, res) => {
    const options = {
      hostname: host,
      port: port,
      path: req.url,
      method: req.method,
      headers: req.headers,
    }

    console.log(req.url);

    // Forward each incoming request to esbuild
    const proxyReq = http.request(options, proxyRes => {
      // If esbuild returns "not found", send a custom 404 page
      if (proxyRes.statusCode === 404) {

        const newOptions = {
          ...options,
          path: '/',
        };
        const proxyReq = http.request(newOptions, proxyRes => {
          // Otherwise, forward the response from esbuild to the client
          res.writeHead(proxyRes.statusCode, proxyRes.headers);
          proxyRes.pipe(res, { end: true });
        });
        proxyReq.end();

        return;
      }

      // Otherwise, forward the response from esbuild to the client
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    // Forward the body of the request to esbuild
    req.pipe(proxyReq, { end: true });
  }).listen(8901);
  console.log(
`Starting dev server

Listening on http://127.0.0.1:%i`
    , 8901);
});



