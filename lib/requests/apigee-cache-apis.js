var request = require("request");
var basic = require('basic-authorization-header');


/***************************************************************************************************************************************
 * Clears all entries from the specified cache. Entries to be cleared can be scoped by CacheKey prefix by using the 'prefix' parameter.*
 ***************************************************************************************************************************************/
module.exports.clearCache = function (u, p, o, env, ca,callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/caches/' + ca + '/entries',
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

        callback(body,response);
    });
};

/************************************
 *Creates a cache in an environment.*
 ************************************
 *********************************************************************************************************************************************************
 *Caches are created per environment. For data segregation, a cache created in 'test', for example, cannot be accessed by API proxies deployed in 'prod'.*
 *The JSON object in the request body can be empty, or the <Cache/> tag in XML can be empty, to create a cache with the default settings.                *
 *********************************************************************************************************************************************************/
module.exports.createCache = function (u, p, o, env, cb,callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/caches',
        qs: {action: 'clear'},
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            },
        body: cb,
        json: true

    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        callback(body,response);
    });
};

/*********************************
 *Gets information about a cache.*
 *********************************
 **************************************************************************************************
 *The response might contain a property named persistent. That property is no longer used by Edge.*
 **************************************************************************************************/
module.exports.getCacheInfo = function (u, p, o, env, ca,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/caches/' + ca,
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

        callback(body,response);
    });
};

/********************************
 *List caches in an environment.*
 ********************************/
module.exports.getEnvironmentCachesList = function (u, p, o, env,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/caches',
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

        callback(body,response);
    });
};

/************************************
 *Updates a cache in an environment.*
 *************************************
 *******************************************************************************************************************************************************
 *You must specify the complete definition of the cache, including the properties that you want to change and the ones that retain their current value.*
 *Any properties omitted from the request body are reset to their default value.                                                                       *
 *Use Get information about a cache to obtain an object containing the current value of all properties, then change only those that you want to update.*
 *******************************************************************************************************************************************************/
module.exports.editCache = function (u, p, o, env, ca, cb,callback) {
    var options = {
        method: 'PUT',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/caches/' + ca,
        qs: {action: 'clear'},
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            },
        body: cb
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};

/******************
 *Deletes a cache.*
 ******************/
module.exports.deleteCache = function (u, p, o, env, ca,callback) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/caches/' + ca,
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

        callback(body,response);
    });
};
