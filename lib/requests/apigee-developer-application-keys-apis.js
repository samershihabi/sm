var request = require("request");
var basic = require('basic-authorization-header');

/**
 *Consumer credentials (also known as API keys or app keys) generated, provisioned, and managed by Apigee Edge for apps
 *  associated with individual developers.
 **/
/**
 *Credential pairs consisting of consumer key and consumer secret provisioned by Apigee Edge to apps for specific API
 * products. Apigee Edge maintains the relationship between consumer keys and API products, enabling API products to be
 * added to and removed from consumer keys. A single consumer key can be used to access multiple API products. Keys may
 * be manually or automatically approved for API products--how they are issued depends on the API product configuration.
 * A key must approved and approved for an API product to be capable of accessing any of the URIs defined in the API
 * product.
 **/

/**
 *Creates a custom consumer key and secret for a developer app. This is particularly useful if you want to migrate
 * existing consumer keys/secrets to Edge from another system.
 *Consumer keys and secrets can contain letters, numbers, underscores, and hyphens. No other special characters are
 * allowed.
 * After creating the consumer key and secret, associate the key with an API product using this API: Add API Product
 * to Key.
 * If a consumer key and secret already exist, you can either keep them or delete them with this API: Delete Key for
 * a Developer App.
 * Also use this API if you have existing API keys and secrets that you want to copy into Edge from another system.
 * For more information, see Import existing consumer keys and secrets.
 **/
module.exports.createConsumerKeyAndSecret = function (u, p, o, dev, appn, keyb,callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev + '/apps/' + appn + '/keys/create',
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

/**
 * Adds an API product to a developer app key, enabling the app that holds the key to access the API resources bundled
 * in the API product. You can also use this API to add attributes to the key.
 * Use this API to add a new API product to an existing app. After adding the API product, you can use the same key to
 * access all API products associated with the app.
 * You must include all existing attributes, whether or not you are updating them, as well as any new attributes that
 * you are adding.
 */
module.exports.addApiProductToKey = function (u, p, o, dev, appn, key, prod,callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev + '/apps/' + appn + '/keys/' + key,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            },
        body: JSON.stringify(prod)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};

/**
 *Set the status of an app's consumer key to 'approved' or 'revoked'.
 *You can approve a consumer key that is currently revoked or pending. Once approved, the app can use the consumer key
 *to access APIs. You can also use this call to reapprove a revoked key.
 *Revoking a consumer key renders it unusable for the app to use to access an API.
 *
 *Note: Any access tokens associated with a revoked app key will remain active, but Apigee Edge checks the status of the
 *app key first. If the status is set to "revoked," Apigee Edge will not allow the call go through.
 **/
module.exports.setApiKeyStatusDeveloperApplication = function (u, p, o, dev, app, key, stat,callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev + '/apps/' + app + '/keys/' + key,
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
 *Sets the association of a consumer key with an API product to 'approved' or 'revoked'. The API product must already be
 *associated with the app.
 *To consume API resources defined in an API product, an app's consumer key must be approved and it must also be
 *approved for that specific API product.
 **/
module.exports.setApiKeyStatusProduct = function (u, p, o, dev, app, key, product, stat,callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev + '/apps/' + app + '/keys/' + key + '/apiproducts/' + product,
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
 *Updates the scope of an app. Note that this API sets the scopes element under the apiProducts element in the
 *attributes of the app.
 *The specified scopes must already exist on the API products associated with the app.
 *Specify the complete list of scopes to apply. The specified list replaces the existing scopes on the app. Therefore,
 *if you are only adding a new scope, you must specify all of the existing scopes along with the new scope.
 **/
module.exports.updateApplicationScope = function (u, p, o, dev, app, key, scopeb,callback) {
    var options = {
        method: 'PUT',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev + '/apps/' + app + '/keys/' + key,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream',
                authorization: basic(u, p)
            },
        body: JSON.stringify(scopeb)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};

/**
 * Deletes a consumer key that belongs to an app, and removes all API products associated with the app. Once deleted,
 * the consumer key cannot be used to access any APIs.
 **/
module.exports.deleteDeveloperApplicationApiKey = function (u, p, o, dev, app, key,callback) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev + '/apps/' + app + '/keys/' + key,
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
 *Removes an API product from an app's consumer key, and thereby renders the app unable to access the API resources
 *defined in that API product.
 *Note that the consumer key itself still exists after this call. Only the association of the key with the API product
 *is removed.
 **/
module.exports.removeProductFromApiKey = function (u, p, o, dev, app, key, prod,callback) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev + '/apps/' + app + '/keys/' + key + '/apiproducts/' + prod,
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
 *Returns details for a consumer key for a developer app, including the key and secret value, associated API products,
 *and other information. All times are displayed as UNIX times.
 **/
module.exports.getApiKeyDetailsForDeveloperApplication = function (u, p, o, dev, app, key,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/developers/' + dev + '/apps/' + app + '/keys/' + key,
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