var request = require("request");
var basic = require('basic-authorization-header');

/*******************************************
 *Creates an API product in an organization.*
 ********************************************
 *******************************************************************************************************************************************************************
 *  You create API products after you have proxied backend services using API proxies.                                                                             *
 *  An API product is a collection of API resources combined with quota settings and metadata that you can use to deliver                                          *
 *  customized and productized API bundles to your developer community. This metadata may include scope, environments,                                             *
 *  API proxies, and an extensible profile.                                                                                                                        *
 *  API products enable you repackage APIs on-the-fly, without having to do any additional coding or configuration.                                                *
 *  We recommend that you start with a simple API product including only required elements. You then provision credentials                                         *
 *  to apps to enable them to start testing your APIs.                                                                                                             *
 *  Once you have authentication and authorization working against a simple API product, you can iterate to create                                                 *
 *  finer-grained API products, defining different sets of API resources for each API product.                                                                     *
 *      +                                                                                                                                                          *
 *     +!+  If you don't specify an API proxy in the request body, any app associated with the product can make calls to any API in your entire organization.      *
 *    + + + If you don't specify an environment in the request body, the product allows access to all environments.                                                *
 *******************************************************************************************************************************************************************/
module.exports.createProduct = function (u, p, o, pr,callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apiproducts',
        qs: {action: 'clear'},
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            },
        body: JSON.stringify(pr)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        callback(body,response);
    });
};

/**********************************************
 *Deletes an API product from an organization.*
 **********************************************
 ********************************************************************************************************************************************************************************
 *  Deleting an API product will cause app requests to the resource URIs defined in the API product to fail. Ensure that you create a new API product to serve existing         *
 *  apps, unless your intention is to disable access to the resources defined in the API product.The API product name required in the request URL is not the "Display Name"     *
 *  value displayed for the API product in the Edge UI. While they may be the same, they are not always the same depending on whether the API product was created via UI or API *
 *For this reason, be sure to get the exact API product name by performing a GET request to the List API Products endpoint. Use the "name" value returned in the response as the*
 * API product name in the request URL.                                                                                                                                         *
 *******************************************************************************************************************************************************************************/
module.exports.deleteProduct = function (u, p, o, prn,callback) {
    var options = {
        method: 'Delete',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apiproducts/' + prn,
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

/**********************************************
 *Gets configuration data for an API product. *
 **********************************************
 ********************************************************************************************************************************************************************************
 *The API product name required in the request URL is not the "Display Name" value displayed for the API product in the Edge UI. While they may be the same, they are not always*
 *the same depending on whether the API product was created via UI or API.                                                                                                      *
 *For this reason, be sure to get the exact API product name by performing a GET request to the List API Products endpoint. Use the "name" value returned in the response as the*
 * API product name in the request URL.                                                                                                                                         *
 *******************************************************************************************************************************************************************************/
module.exports.getProduct = function (u, p, o, prn,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apiproducts/' + prn,
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

/**********************************************************
 *Get a list of all API product names for an organization.*
 *********************************************************/
module.exports.getProductsList = function (u, p, o,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apiproducts',
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

/************************************************************************
 *Returns a list of API products filtered by attribute names and values.*
 ***********************************************************************/
module.exports.searchApiProduct = function (u, p, o, atn, atv,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apiproducts?attributename=' + atn + '&attributevalue=' + atv,
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

/*********************************************************************************************************************************************************************
 * Updates an existing API product. You must include all required values, whether or not you are updating them, as well as any optional values that you are updating.*
 *The API product name required in the request URL is the internal name of the product, not the Display Name.                                                        *
 *********************************************************************************************************************************************************************/
module.exports.updateProduct = function (u, p, o, prn, pr,callback) {
    var options = {
        method: 'PUT',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apiproducts/' + prn,
        qs: {action: 'clear'},
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            },
        body: JSON.stringify(pr)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};

/************************************************
 *Returns the value of an API product attribute.*
 ***********************************************/
module.exports.getApiProductAttribute = function (u, p, o, prn, atn,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apiproducts/' + prn + '/attributes/' + atn,
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

/************************************************
 *Updates the value of an API product attribute.*
 ***********************************************/
module.exports.getApiProductAttribute = function (u, p, o, prn, atn, atv,callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apiproducts/' + prn + '/attributes/' + atn,
        qs: {action: 'clear'},
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            },
        body: JSON.stringify(atv)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};

/*************************************
 *Deletes an API product attribute.  *
 ************************************/
module.exports.deleteApiProductAttribute = function (u, p, o, prn, atn,callback) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apiproducts/' + prn + '/attributes/' + atn,
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

/***********************************************
 *Returns a list of all API product attributes.*
 **********************************************/
module.exports.getApiProductAttributes = function (u, p, o, prn,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apiproducts/' + prn + '/attributes',
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

/********************************************
 *Updates or creates API product attributes.*
 ********************************************
 ***************************************************************************************************************************
 *This API replaces the current list of attributes with the attributes specified in the request body. This lets you update *
 *existing attributes, add new attributes, or delete existing attributes by omitting them from the request body.           *
 **************************************************************************************************************************/
module.exports.updateAllApiProductAttributes = function (u, p, o, prn, atn, atv,callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apiproducts/' + prn + '/attributes',
        qs: {action: 'clear'},
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            },
        body: JSON.stringify(atv)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};
