var request = require("request");
var basic = require('basic-authorization-header');

/*********************************
 *Approve or Revoke Developer App*
 *********************************/
/***********************************************************************************************************************
 *Set the API key status of a developer app to 'approved' or 'revoked'.                                                *
 *If an app is revoked, none of its API keys are valid for API calls even though the keys themselves still display an  *
 *"Approved" status.                                                                                                   *
 *The HTTP status code for success is: 204 No Content.                                                                 *
 **********************************************************************************************************************/
module.exports.setApiKeyStatusDeveloper = function (u, p, o, dev, app, stat) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev + '/apps/' + app,
        qs: {action: stat},
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


/************************************************************************************************************************
 *Creates an app associated with a developer, associates the app with an API product, and auto-generates an API key for *
 *  the app to use in calls to API proxies inside the API product.                                                      *
 *The name is the unique ID of the app that you can use in management API calls. The DisplayName (set with an attribute)*
 *is what appears in the management UI. If you don't provide a DisplayName, the name is used.                           *
 *The keyExpiresIn property sets the expiration on the API key. If you don't set this, or set the value to -1, they API *
 *  key never expires.                                                                                                  *
 ***********************************************************************************************************************/
module.exports.createApplicationToDeveloper = function (u, p, o, dev, app) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev + '/apps',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream',
                authorization: basic(u, p)
            },
        body: JSON.stringify(app)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
    });
};

/**************************
 *Deletes a developer app.*
 *************************/
module.exports.deleteApplicationToDeveloper = function (u, p, o, dev, app) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev + '/apps/' + app,
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

/***********************************************************************************************************************
 *Get the profile of a specific developer app. All times in the response are UNIX times.                               *
 *Note that the response contains a top-level attribute named accessType that is no longer used by Apigee.             *
 **********************************************************************************************************************/
module.exports.getApplicationDeveloperProfile = function (u, p, o, dev, app) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev + '/apps/' + app,
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

/*********************************************************************************************************************
 * Gets the number of API resources that have been approved for access by a developer app in a specific organization.*
 ********************************************************************************************************************/
module.exports.countDeveloperApiResources = function (u, p, o, dev, app, q, en) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev + '/apps/' + app,
        qs: {query: q, entity: en},
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

/**********************************************************************************************************************
 * Lists all apps created by a developer in an organization, and optionally provides an expanded view of the apps. All*
 * time values in the response are UNIX times.                                                                        *
 *********************************************************************************************************************/
module.exports.getDeveloperApplicationsList = function (u, p, o, dev, ex) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev + '/apps',
        qs: {expand: ex},
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
 *Updates a developer app. You can also add an app to an API product with this call, which automatically generates an
 * API key for the app to use when calling APIs in the product. (If you want to use an existing API key for another API
 * product as well, see Add API Product to Key.)
 * Be sure to include all existing attributes in the request body.
 * Note that you cannot update the scopes associated with the app by using this API. Instead, use "Update the Scope of
 * an App".
 ***/
module.exports.updateDeveloperApplications = function (u, p, o, dev, app, appb) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev + '/apps/' + app,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream',
                authorization: basic(u, p)
            },
        body: JSON.stringify(appb)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
    });
};

/**
 *Generates a new consumer key and consumer secret for the named developer app. Rather than replacing an existing key,
 * this API call generates a new key. For example, if you're using API key rotation, you can generate new keys whose
 * expiration overlaps keys that will be out of rotation when they expire. You might also generate a new key/secret if
 * the security of the original key/secret is compromised.
 *After using this API, multiple key pairs will be associated with a single app. Each key pair has an independent status
 *(revoked or approved) and an independent expiry time. Any non-expired, approved key can be used in an API call.
 *The keyExpiresIn value is in milliseconds. A value of -1 means the key/secret pair never expire.
 *In this API call, be sure to include any existing app attributes. If you don't, the existing attributes are deleted.
 *You can also add or modify attributes in this call.
 *To revoke a key/value pair that has been compromised so that it can no longer be used, see Approve or Revoke Specific
 * Key of Developer App.
 *If you want to determine the consumer key and consumer secret rather than having Edge generate them randomly,
 * see Import existing consumer keys and secrets. (However, that API does not let you set an expiration time.)
 ***/
module.exports.generateApiKeyAndSecret = function (u, p, o, dev, app, key) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev + '/apps/' + app,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream',
                authorization: basic(u, p)
            },
        body: JSON.stringify(key)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
    });
};

/****************************************
 *Returns the value of an app attribute.*
 ***************************************/
module.exports.getApplicationAttribute = function (u, p, o, dev, app, att) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev + '/apps/' + app + '/attributes/' + att,
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

/****************************************
 *Update the value of an app attribute.*
 ***************************************/
module.exports.updateApplicationAttribute = function (u, p, o, dev, app, att, attb) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev + '/apps/' + app + '/attributes/' + att,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream',
                authorization: basic(u, p)
            },
        body: JSON.stringify(attb)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
    });
};

/****************************************
 *Delete the value of an app attribute.*
 ***************************************/
module.exports.deleteApplicationAttribute = function (u, p, o, dev, app, att) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev + '/apps/' + app + '/attributes/' + att,
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

/****************************************
 *Returns a list of all app attributes.*
 ***************************************/
module.exports.getApplicationAttributeList = function (u, p, o, dev, app) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev + '/apps/' + app + '/attributes',
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
 *Updates or creates app attributes.
 *This API replaces the current list of attributes with the attributes specified in the request body. This lets you
 * update existing attributes, add new attributes, or delete existing attributes by omitting them from the request body.
 ***/
module.exports.updateAllApplicationAttributes = function (u, p, o, dev, app, attb) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev + '/apps/' + app + '/attributes',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream',
                authorization: basic(u, p)
            },
        body: JSON.stringify(attb)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
    });
};



