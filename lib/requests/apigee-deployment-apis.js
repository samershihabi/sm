var request = require("request");
var basic = require('basic-authorization-header');

/**
 *Returns detail on all deployments of the API proxy for all environments. All deployments are listed in the test and
 *  prod environments, as well as other environments, if they exist.
 ***/
module.exports.getApiProxyDeploymentDetails = function (u, p, o, apin) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis/' + apin + '/deployments',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream',
                authorization: basic(u, p)
            }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
    });
};

/**
 *Get deployment details for a specific revision number of an API proxy, which includes router and message processor UUIDs.
 **/
module.exports.getApiProxyRevisionDeploymentDetails = function (u, p, o, apin, r) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis/' + apin + '/revisions/' + r + '/deployments',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream',
                authorization: basic(u, p)
            }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
    });
};

/**
 *Gets a list of all API proxies that are deployed to a specific environment.
 *The server element is used to identify servers that support the API proxy deployment. The values are used internally
 *by Apigee to provide information for support.
 **/
module.exports.getEnviromentDeploymentDetails = function (u, p, o, env) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/enviroments/' + env + '/deployments',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream',
                authorization: basic(u, p)
            }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
    });
};

/**
 *Returns a list of all API proxies that are deployed in all environments in an organization.
 **/
module.exports.getOrganizationDeploymentDetails = function (u, p, o, ss, apic) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/deployments',
        qs: {includeServerStatus: ss, includeApiConfig: apic},
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
    });
};

/**
 *Returns a list of all API proxies that are deployed in the specified environment.
 **/
module.exports.getApiProxyEnviromentDeploymentDetails = function (u, p, o, env, apin) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/enviroments/' + env + '/apis/' + apin + '/deployments',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
    });
};

/**
 *Gets a list of all API proxies that are deployed to a specific environment.
 *The server element is used to identify servers that support the API proxy deployment. The values are used internally
 *by Apigee to provide information for support.
 **/
module.exports.getApiProxyRevisionEnviromentDeploymentDetails = function (u, p, o, env, r, apin) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/enviroments/' + env + '/apis/' + apin + '/revisions/' + r + '/deployments',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
    });
};