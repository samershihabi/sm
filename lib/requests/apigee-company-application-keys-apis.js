var request = require("request");
var basic = require('basic-authorization-header');


/**
 * Consumer credentials (also known as "API keys" or "app keys") that are generated, provisioned, and managed by Apigee
 * Edge for apps associated with company entities.
 ***/

/**
 *Approve or revoke a company app key
 */

/**
 *Sets the state of a key associated with a company app to 'approved' or 'revoked'.
 *An app with an unapproved key cannot access any API products and cannot invoke any APIs managed by Apigee Edge.
 *Note: Any access tokens associated with a revoked app key will remain active, but Apigee Edge checks the status of the
 *app key first. If the status is set to "revoked," Apigee Edge will not allow the call go through.
 */
module.exports.setApiKeyStatusCompanyApplication = function (u, p, o, cn, app, ckey, stat,callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/companies/' + cn + '/apps/' + app + '/keys/' + ckey,
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

        callback(body,response);
    });
};

/**
 * Deletes a key for a company app and removes all API products associated with the app. The key can no longer be used
 * to access any APIs.
 */
module.exports.deleteCompanyApplicationKey = function (u, p, o, cn, app, ckey,callback) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/companies/' + cn + '/apps/' + app + '/keys/' + ckey,
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
 *Gets information about the consumer key issued to a specific company app.
 */
module.exports.getCompanyApplicationKeyInfo = function (u, p, o, cn, app, ckey,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/companies/' + cn + '/apps/' + app + '/keys/' + ckey,
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
 * Updates an existing company app key to add additional API products or attributes. Note that only a single API product
 * can be resolved per app key at runtime. API products are resolved by name, in alphabetical order. The first API
 * product found in the list will be returned.
 */
module.exports.updateCompanyApplicationKey = function (u, p, o, cn, app, ckey, keyb,callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/companies/' + cn + '/apps/' + app + '/keys/' + ckey,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            },
        body: JSON.stringify(keyb)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};



