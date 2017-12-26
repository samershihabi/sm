var request = require("request");
var basic = require('basic-authorization-header');


/**
 *Import and create a resource file for an organization by pasting the contents of the file in the request body.
 */

module.exports.importOrganizationResourceFile = function (u, p, o, rsn, rst, rsb) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/resourcefiles',
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
 *Upload resource file to an organization
 **/
module.exports.importOrganizationResourceFileUpload = function (u, p, o, rsn, rst, rsf) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/resourcefiles',
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
 * Gets the content of an organization-scoped resource file.
 */
module.exports.getOrganizationResourceFile = function (u, p, o, rsn, rst) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/resourcefiles/' + rst + '/' + rsn,
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
 *Updates a resource file in an organization.
 *Paste the contents of the file in the request body.
 */
module.exports.updateOrganizationResourceFile = function (u, p, o, rsn, rst, rsb) {
    var options = {
        method: 'PUT',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/resourcefiles/' + rst + '/' + rsn,
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
 * Updates a resource file in an organization through file upload. This is an alternative to updating a resource file by
 * passing the file contents in the request body, as described in Update a resource file in an organization.
 */

module.exports.updateOrganizationResourceFileUpload = function (u, p, o, rsn, rst, rsf) {
    var options = {
        method: 'PUT',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/resourcefiles/' + rst + '/' + rsn,
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
 * Lists the resource files in an organization.
 */
module.exports.getOrganizationResourceFilesList = function (u, p, o) {
    var options = {
        method: 'PUT',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/resourcefiles',
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
 * Deletes a resource file from an organization.
 */
module.exports.deleteOrganizationResourceFile = function (u, p, o, rsn, rst) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/resourcefiles/' + rst + '/' + rsn,
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

