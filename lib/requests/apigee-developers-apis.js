var request = require("request");
var basic = require('basic-authorization-header');

/**
 *Developers implement client/consumer apps and must be registered with an organization on Apigee Edge.
 **/


/**
 *Creates a profile for a developer in an organization. Once created, the developer can register an app and receive
 * an API key.
 *The developer is always created with a status of active. To set the status explicitly, use Set Developer Status.
 *For more information about the monetization attributes, see Adding developers to your organization.
 **/
module.exports.createDeveloper = function (u, p, o, devb,callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            },
        body: JSON.stringify(devb)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        callback(body,response);
    });
};

/**
 *Deletes a developer from an organization. All apps and API keys associated with the developer are also removed from the
 *organization. All times in the response are UNIX times.
 *To avoid permanently deleting developers and their artifacts, consider deactivating developers instead. See Set
 *Developer Status.
 **/
module.exports.deleteDeveloper = function (u, p, o, dev,callback) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev,
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

/**
 *Returns the profile for a developer by email address or ID. All time values are UNIX time values. The profile includes
 *the developer's apps, email address, ID, name, and other information.
 **/
module.exports.getDeveloper = function (u, p, o, dev,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev,
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

/**
 *Gets the developer profile by app name. The profile retrieved is for the developer associated with the app in the
 *organization. All time values are UNIX time values
 **/
module.exports.getDeveloperByApplication = function (u, p, o, appn,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers',
        qs: {app: appn},
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

/**
 *Lists all developers in an organization by email address. This call does not list any company developers who are a
 * part of the designated organization.
 **/
module.exports.getDeveloperList = function (u, p, o, ex, s, l,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers',
        qs: {expand: ex, startKey: s, count: l},
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

/**
 *Sets a developer's status to active or inactive for a specific organization. Run this API for each organization where
 *you want to change the developer's status.
 *By default, the status of a developer is set to active. Admins with proper permissions (such as Organization
 *Administrator) can change a developer's status using this API call.
 *If you set a developer's status to inactive, the API keys assigned to the developer's apps are no longer valid even
 *though keys continue to show a status of "Approved" (in strikethrough text in the management UI). Inactive developers,
 *however, can still log into the developer portal and create apps. The new keys that get created just won't work.

 The HTTP status code for success is: 204 No Content.
 **/
module.exports.setDeveloperStatus = function (u, p, o, dev, status,callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev,
        qs: {action: status},
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream.',
                authorization: basic(u, p)
            }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};

/**
 *Update an existing developer profile.
 *To add new values or update existing values, submit the new or updated portion of the developer profile along with the
 *rest of the developer profile, even if no values are changing.
 *To delete attributes from a developer profile, submit the entire profile without the attributes that you want to delete.
 For more information about the monetization attributes, see Adding developers to your organization.
 **/
module.exports.updateDeveloper = function (u, p, o, dev, devb,callback) {
    var options = {
        method: 'PUT',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream.',
                authorization: basic(u, p)
            },
        body: JSON.stringify(devb)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};

/**
 *Returns the value of a developer attribute.
 **/
module.exports.getDevloperAttribute = function (u, p, o, dev, attr,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev + '/attributes/' + attr,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream.',
                authorization: basic(u, p)
            }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};

/**
 * Updates the value of a developer attribute.
 */
module.exports.updateDevloperAttribute = function (u, p, o, dev, attr, attrb,callback) {
    var options = {
        method: 'PUT',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev + '/attributes/' + attr,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream.',
                authorization: basic(u, p)
            },
        body: JSON.stringify(attrb)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};

/**
 *Deletes a developer attribute.
 **/
module.exports.deleteDevloperAttribute = function (u, p, o, dev, attr,callback) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev + '/attributes/' + attr,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream.',
                authorization: basic(u, p)
            }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};

/**
 *Returns a list of all developer attributes.
 **/
module.exports.getDevloperAttributesList = function (u, p, o, dev,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev + '/attributes',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream.',
                authorization: basic(u, p)
            }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};

/**
 *Updates or creates developer attributes.
 *This API replaces the current list of attributes with the attributes specified in the request body. This lets you
 *update existing attributes, add new attributes, or delete existing attributes by omitting them from the request body.
 **/
module.exports.updateAllDeveloperAttributes = function (u, p, o, dev, attrb,callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev + '/attributes',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream.',
                authorization: basic(u, p)
            },
        body: JSON.stringify(attrb)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};
