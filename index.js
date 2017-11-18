#! /usr/bin/env node

var http = require('http');
var ProxyAgent = require('proxy-agent');
const request = require('request');
const hostname = '127.0.0.1';
const port = process.argv[2] || 1090;

var proxyUri = process.env.socks_proxy || 'socks5://127.0.0.1:57197';

const server = http.createServer((req, res) => {

    request({
        url: req.url,
        headers: req.headers,
        method: req.method,
        agent: new ProxyAgent(proxyUri)
    }).pipe(res);

});

server.listen(port, hostname, () => {
    console.log(`PAS running at http://${hostname}:${port}/`);
});