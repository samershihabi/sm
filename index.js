var kvm = require('./lib/requests/apigee-proxy-kvm-apis');
var util = require('./lib/utils');
var apis = require('./lib/requests/apigee-api-proxy-apis');
var ziputils = require('./lib/ziputils');

//var dirCheck=util.apiProxyDirsCheck('/Users/ap/ab_api_proxies/apiproxy/');
ziputils.zipDirectory('/Users/ap/ab_api_proxies/mock/', 'apiproxy', function (err, zipBuf) {
    if (err) throw new Error(err);
    console.log(zipBuf)
    //apis.importNewApiProxy("saleh-jaz1@hotmail.com", "P@$$w0rd", "salehmashal", "mock",zipBuf);
    apis.deployApiProxyRevision("saleh-jaz1@hotmail.com", "P@$$w0rd", "salehmashal", "test", "mock", 1, 100, true);
});
