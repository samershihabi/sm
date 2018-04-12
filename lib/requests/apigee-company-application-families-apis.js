var request = require("request");
var basic = require('basic-authorization-header');

/**
 *App families enable you to create functional groups of apps. A single app may be instantiated in several forms. For
 * example, an app may have sandbox instance and a production instance. App families enable these app instances to be
 * associated. You can do this by linking the instances of the app together in a an app family collection. Specify an
 * app family name, associate that name with a developer or a company of your organization, and select one or more app
 * IDs to add to the contents of the app family. You can create app families for developer apps or for company apps
 * within your organization.
 **/

/**
 *Creates a company app family.
 * A company app family is a collection of apps associate with a company entity.
 * Note: Characters you can use in the name attribute are restricted to: A-Z0-9._\-$ %.
 **/
module.exports.createCompanyApplicationFamily = function (u, p, o, cn, cafb,callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/companies/' + cn + '/appfamilies',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream',
                authorization: basic(u, p)
            },
        body: JSON.stringify(cafb)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};

/**
 * Deletes a company app family.
 */
module.exports.deleteCompanyApplicationFamily = function (u, p, o, cn, cafn,callback) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/companies/' + cn + '/appfamilies/' + cafn,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream',
                authorization: basic(u, p)
            }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};


/**
 *Gets a list of apps in an company app family.
 **/
module.exports.getCompanyApplicationFamily = function (u, p, o, cn, cafn,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/companies/' + cn + '/appfamilies/' + cafn,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream',
                authorization: basic(u, p)
            }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};

/**
 * Remove an app from a company app family.
 */
module.exports.removeCompanyApplicationFromFamily = function (u, p, o, cn, cafn, appn,callback) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/companies/' + cn + '/appfamilies/' + cafn + '/apps/' + appn,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream',
                authorization: basic(u, p)
            }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};

/**
 * Updates a company app family by modifying the apps associated with it. This method does not simply add the app you
 * specify. You need to specify the entire list of apps when you call this method.
 */
module.exports.updateCompanyApplicationFamily = function (u, p, o, cn, cafn, cafb,callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/companies/' + cn + '/appfamilies/' + cafn,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream',
                authorization: basic(u, p)
            },
        body: JSON.stringify(cafb)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};
