var request = require("request");
var basic = require('basic-authorization-header');


/**********************************************************
 * A consumer/client app associated with a company entity.*
 * ********************************************************* ***********************************************************
 An app can be associated with a company in the same way that an app can be associated with a developer. An app
 associated with a company is called a company app. For more background information, see Companies for a description of
 the distinction between organization developers and company developers. Also see Apps: Developer for details on the
 Developer Apps API.
 ** ********************************************************* **********************************************************/

/********************************************************** ************************************************************
 * Creates an app for a company. Note that you must first create a profile for the company in your organization before *
 * you can register apps that are associated with the company. See Create Company.                                     *
 *********************************************************** **********************************************************/
module.exports.createCompanyApplication = function (u, p, o, cn, appb) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/companies/' + cn + '/apps',
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

/************************
 *Deletes a company app.*
 ***********************/
module.exports.deleteCompanyApplication = function (u, p, o, cn, appn) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/companies/' + cn + '/apps/' + appn,
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

/********************************************** ************************************************************************
 * Gets the count of API resources for a company app. The API resources are aggregated across all API products with    *
 * which the company app is associated. In other words, this call returns the total number API resources (URIs) that a *
 * company app is able to access.                                                                                      *
 **************************************** *****************************************************************************/
module.exports.countCompanyApiResources = function (u, p, o, cn, appn) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/companies/' + cn + '/apps/' + appn,
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

/****************************************** ***************************************************************************
 *List company apps in an organization. Optionally specify to expand the response to include the profile for each app.*
 ******************************************* *************************************************************************/
module.exports.getCompanyAppsList = function (u, p, o, cn, ex, ks) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/companies/' + cn + '/apps',
        qs: {expand: ex, keyStatus: ks},
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

/***********************************
 * Updates an existing company app.*
 **********************************/
module.exports.updateCompanyAppsList = function (u, p, o, cn, appn) {
    var options = {
        method: 'PUT',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/companies/' + cn + '/apps/' + appn,
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