var request = require("request");
var basic = require('basic-authorization-header');


/************************************************************************************************************************************
 *Gets the names of all environments in an organization. By default, an Apigee organization contains two environments: test and prod.*
 ************************************************************************************************************************************/
module.exports.getEnviromentNames = function (u, p, o) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/',
        qs: {action: 'clear'},
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

/************************************************************************************************************************
 *Gets environment details, such as the UNIX times at which the environment was created and last modified, the user name*
 * of the Apigee user who created and last modified the environment, the name of the environment, and a list of property*
 * names and values that are reserved for use by Apigee.                                                                *
 ***********************************************************************************************************************/
module.exports.getEnviromentDetails = function (u, p, o, env) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env,
        qs: {action: 'clear'},
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

/*************************************************************************************************************************
 *Gets a list of all API proxies that are deployed to a specific environment.                                            *
 *The server element is used to identify servers that support the API proxy deployment. The values are used internally by*
 *Apigee to provide information for support.                                                                             *
 *************************************************************************************************************************/
module.exports.getEnviromentDeployedApiProxies = function (u, p, o, env) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/deployments',
        qs: {action: 'clear'},
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

/*********************************************************************************************
 *Returns a list of all API proxies that are deployed in all environments in an organization.*
 ********************************************************************************************/
module.exports.getOrganizationDeployedApiProxies = function (u, p, o) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/deployments?includeServerStatus=true&includeApiConfig=true',
        qs: {action: 'clear'},
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

/***********************************************************************************
 *Returns a list of all API proxies that are deployed in the specified environment.*
 **********************************************************************************/
module.exports.getEnviromentDeploymentApiProxiesDetails = function (u, p, o, env, an) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/apis/' + an + '/deployments',
        qs: {action: 'clear'},
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

/********************************************************************************************************************************
 *Gets a list of all API proxies that are deployed to a specific environment.                                                   *
 *The server element is used to identify servers that support the API proxy deployment. The values are used internally by Apigee*
 *to provide information for support.                                                                                           *
 ********************************************************************************************************************************/
module.exports.getEnviromentDeploymentApiProxiesRevisionDetails = function (u, p, o, env, an, ar) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/apis/' + an + '/revisions/' + ar + '/deployments',
        qs: {action: 'clear'},
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