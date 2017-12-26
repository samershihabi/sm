var request = require("request");
var basic = require('basic-authorization-header');

/**
 *A developer within an organization who is associated with a company. The company developer creates apps on behalf of
 * the company, and any apps created by a company developer are associated with the company and known as 'company apps'.
 * The Company Developers API enables you to add developers to companies. A developer must exist in the system before
 * you can associate them with a company.
 * You associate a developer with a company by adding the developer's email and assigning the developer a role. Company
 * developer roles are enforced within the client app that you build using the API, not within the Apigee system. Thus,
 * when you retrieve a list of company apps on behalf of a developer, it is your code that checks the developer's role
 * and displays the capabilities appropriate to that role. You typically create an admin role to allow a company
 * developer to add other developers, delete company apps, and so on. Company developers are mapped to developers in
 * your organization using the developer email as a key. The mapping associates the developer with the company and adds
 * a role. The company developer entity thus has simply an email address and a role while the organization developer
 * entity that it maps to can have a wide variety of attributes defined.
 **/

/**
 * Adds a developer to a company, or updates an existing developer in the company. When updating an existing developer,
 * specify both the developer's email and role.
 */
module.exports.editCompanyDevelopers = function (u, p, o, cn, cdevb) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/companies/' + cn + '/developers',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            },
        body: JSON.stringify(cdevb)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
    });
};

/**
 *Removes the association of a developer with a company.
 */
module.exports.editCompanyDevelopers = function (u, p, o, cn, devemail) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/companies/' + cn + '/developers/' + devemail,
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
 * Lists all developers associated with a company.
 */
module.exports.getCompanyDevelopers = function (u, p, o, cn) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/companies/' + cn + '/developers',
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


