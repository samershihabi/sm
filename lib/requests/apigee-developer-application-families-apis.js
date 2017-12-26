var request = require("request");
var basic = require('basic-authorization-header');

/**
 * App families enable you to create functional groups of apps. A single app may be instantiated in several forms. For
 * example, an app may have sandbox instance and a production instance. App families enable these app instances to be
 * associated. You can do this by linking the instances of the app together in a an app family collection. Specify an
 * app family name, associate that name with a developern of your organization, and select one or more app IDs to add
 * to the contents of the app family. You can create app families for developer apps or for company apps within your
 * organization.
 **/

/**
 *Creates an app family for a developer. An app family is an association of one or more apps in the family. An app can
 * only be a associated with a single app family.
 * The association of apps in an app family is entirely arbitrary. Apigee does no special processing on such collections
 * , except to maintain the relationship among apps that are contained in an family.
 * Note: Characters you can use in the name are restricted to: A-Z0-9._\-$ %.
 **/
module.exports.createDeveloperApplicationFamily = function (u, p, o, dev, afnb) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/Developers/' + dev + '/appfamilies',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            },
        body: JSON.stringify(afnb)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
    });
};

/**
 * Deletes a developer's app family. The apps in the family are not affected.
 */
module.exports.deleteDeveloperApplicationFamily = function (u, p, o, dev, afn) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/Developers/' + dev + '/appfamilies/' + afn,
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
 * Gets a list of apps in an app family for a developer.
 */
module.exports.getDeveloperApplicationFamily = function (u, p, o, dev, afn) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/Developers/' + dev + '/appfamilies/' + afn,
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
 * Lists all developer app families in an organization. Optionally returns an expanded list of all app families in an
 * organization, including all apps in each app family.
 */
module.exports.getDeveloperApplicationFamilyList = function (u, p, o, dev, ex) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/Developers/' + dev + '/appfamilies',
        qs: {expand: ex},
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
 *  Removes an app from a developer's app family. An app family requires at least one app. Therefore, removing all apps
 *  from an app family also deletes the app family.
 **/
module.exports.deleteDeveloperApplicationFromFamily = function (u, p, o, dev, afn, appn) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/Developers/' + dev + '/appfamilies/' + afn + '/apps/' + appn,
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
 *Updates an existing app family to change its name or the list of apps in the family. You must specify the entire
 *request object, including the name property and apps property.
 **/
module.exports.updateDeveloperApplicationFamily = function (u, p, o, dev, afn, appb) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/Developers/' + dev + '/appfamilies/' + afn,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            },
        body: JSON.stringify(appb)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
    });
};
