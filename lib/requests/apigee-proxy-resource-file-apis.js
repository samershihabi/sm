var request = require("request");
var basic = require('basic-authorization-header');


/**
 *Import and create a resource file for an environments by pasting the contents of the file in the request body.
 */

module.exports.importApiProxyResourceFile = function (u, p, o, apin, r, rsn, rst, rsb,callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis/' + apin + '/revisions/' + r + '/resourcefiles',
        qs: {name: rsn, type: rst},
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream',
                authorization: basic(u, p)
            },
        body: rsb

    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};

/**
 *Imports a resource file into an API proxy through file upload. This is an alternative to importing a resource file by
 * passing the file contents in the request body, as described in Import a resource file for an API.
 **/
module.exports.importApiProxyResourceFileUpload = function (u, p, o, apin, r, rsn, rst, rsf,callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis/' + apin + '/revisions/' + r + '/resourcefiles',
        qs: {name: rsn, type: rst},
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'multipart/form-data',
                authorization: basic(u, p)
            },
        formData: {file: rsf}

    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};

/**
 * Gets the content of an API proxy-scoped resource file.
 */
module.exports.getApiProxyResourceFile = function (u, p, o, apin, r, rsn, rst,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis/' + apin + '/revisions/' + r + '/resourcefiles/' + rst + '/' + rsn,
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
 *Updates a resource file in an Api proxy.
 *Paste the contents of the file in the request body.
 */
module.exports.updateApiProxyResourceFile = function (u, p, o, apin, r, rsn, rst, rsb,callback) {
    var options = {
        method: 'PUT',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis/' + apin + '/revisions/' + r + '/resourcefiles/' + rst + '/' + rsn,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream',
                authorization: basic(u, p)
            },
        body: rsb

    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};

/**
 * Updates a resource file in an api proxy through file upload. This is an alternative to updating a resource file by
 * passing the file contents in the request body, as described in Update a resource file in an environment.
 */

module.exports.updateApiProxyResourceFileUpload = function (u, p, o, apin, r, rsn, rst, rsf,callback) {
    var options = {
        method: 'PUT',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis/' + apin + '/revisions/' + r + '/resourcefiles/' + rst + '/' + rsn,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'multipart/form-data',
                authorization: basic(u, p)
            },
        formData: {file: rsf}

    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};

/**
 * Lists the resource files in an api proxy.
 */
module.exports.getApiProxyResourceFilesList = function (u, p, o, apin, r,callback) {
    var options = {
        method: 'PUT',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis/' + apin + '/revisions/' + r + '/resourcefiles',
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
 * Deletes a resource file from an Api Proxy.
 */
module.exports.deleteApiProxyResourceFile = function (u, p, o, apin, r, rsn, rst,callback) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis/' + apin + '/revision/' + r + '/resourcefiles/' + rst + '/' + rsn,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'multipart/form-data',
                authorization: basic(u, p)
            }

    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};

