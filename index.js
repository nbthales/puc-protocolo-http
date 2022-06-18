'use strict';

const soap = require('soap');
var http = require('http');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});
const wsdlUrl = 'http://www.chemspider.com/MassSpecAPI.asmx?WSDL';

http
  .createServer(function (req, res) {
    proxy.web(req, res, { target: wsdlUrl });
  })
  .listen(3000);

soap.createClientAsync(wsdlUrl, { overridePromiseSuffix: 'Promise' }).then((client) => {
  client.GetDatabasesPromise({}).then((results) => {
    const databases = results[0].GetDatabasesResult.string;
    console.dir(databases);
  });
});
