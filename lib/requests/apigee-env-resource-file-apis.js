var request = require("request");
var basic = require('basic-authorization-header');


/**
 *Import and create a resource file for an environments by pasting the contents of the file in the request body.
 */

module.exports.importEnviromentResourceFile = function (u, p, o, env, rsn, rst, rsb) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/resourcefiles',
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

        return body;
    });
};

/**
 *Upload resource file to an environments
 **/
module.exports.importEnvironmentsResourceFileUpload = function (u, p, o, env, rsn, rst, rsf) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/resourcefiles',
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

        return body;
    });
};

/**
 * Gets the content of an environments-scoped resource file.
 */
module.exports.getEnvironmentsResourceFile = function (u, p, o, env, rsn, rst) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/resourcefiles/' + rst + '/' + rsn,
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
 *Updates a resource file in an environment.
 *Paste the contents of the file in the request body.
 */
module.exports.updateEnvironmentsResourceFile = function (u, p, o, env, rsn, rst, rsb) {
    var options = {
        method: 'PUT',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/resourcefiles/' + rst + '/' + rsn,
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

        return body;
    });
};

/**
 * Updates a resource file in an environment through file upload. This is an alternative to updating a resource file by
 * passing the file contents in the request body, as described in Update a resource file in an environment.
 */

module.exports.updateEnvironmentResourceFileUpload = function (u, p, o, env, rsn, rst, rsf) {
    var options = {
        method: 'PUT',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/resourcefiles/' + rst + '/' + rsn,
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

        return body;
    });
};

/**
 * Lists the resource files in an environment.
 */
module.exports.getEnvironmentResourceFilesList = function (u, p, o, env) {
    var options = {
        method: 'PUT',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/resourcefiles',
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
 * Deletes a resource file from an Environments.
 */
module.exports.deleteEnvironmentResourceFile = function (u, p, o, env, rsn, rst) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/resourcefiles/' + rst + '/' + rsn,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'multipart/form-data',
                authorization: basic(u, p)
            }

    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
    });
};

