#! /usr/bin/env node

const http = require('http');
const ProxyAgent = require('proxy-agent');
const request = require('request');
const version = require('./package.json').version

const hostname = '127.0.0.1';
const port = process.argv[2] || 1090;

const proxyUri = process.env.socks_proxy || 'socks5://127.0.0.1:1080';

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    request({
        url: req.url,
        headers: req.headers,
        method: req.method,
        agent: new ProxyAgent(proxyUri)
    })
    .on('data', buf => console.log(`Data length: ${buf.length}`))
    .on('error', function (err) {
        console.log(err);
        res.statusCode = 500;
        res.end(`PAS Error: ${err.toString()}`);
    })
    .pipe(res);

});

server.listen(port, hostname, () => {
    console.log(`Proxy-agent-server v${version} running at http://${hostname}:${port}/ -> ${proxyUri}`);
});