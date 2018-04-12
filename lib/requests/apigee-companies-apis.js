var request = require("request");
var basic = require('basic-authorization-header');

/**
 * An optional grouping entity for apps, which enables corporate entities or groups of developers to manage apps
 * *********************************************************************************************************************
 *A company is a collection of developers managed as a single entity. A company can be any grouping that is appropriate
 * to your organization, e.g., business unit, product line, or division. Grouping developers into companies is useful
 * when your goal is to work with multiple developers associated under a single corporate entity for billing purposes,
 * for example. However, it not required that the developers in your organization are associated with a company. This
 * API is completely optional. Note that a developer is always a single entity, uniquely identified by the email element.
 **/


/**************************************
 *Creates a company in an organization*
 *************************************/
/**********************************************************************************************************************
 The company is always created with a status of active. To set the status explicitly, use Set the Status of a Company.
 The attributes in the sample payload below apply to company configuration in monetization. For non-monetized companies,
 you need send only name and displayName.
 To set the company's billing type (PREPAID to POSTPAID), make sure the organization profile is configured to support
 your setting (for example, set to accept BOTH). See Edit the
 **********************************************************************************************************************/
module.exports.createCompany = function (u, p, o, cb,callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/companies',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            },
        body: JSON.stringify(cb)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};

/******************************
 * Deletes an existing company.*
 *****************************/
module.exports.deleteCompany = function (u, p, o, cn,callback) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/companies/' + cn,
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

/*******************************
 * List details for a company.*
 ******************************/
module.exports.getCompanyDetails = function (u, p, o, cn,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/companies/' + cn,
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

/*****************************************************************************************************************
 * List all companies in an organization, and optionally returns an expanded list of companies, displaying a full*
 * profile for each company in the organization.                                                                 *
 ****************************************************************************************************************/
module.exports.getCompaniesList = function (u, p, o, exp,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/companies',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            },
        qs: {expand: exp}
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};

/**************************************************************************************************************************
 * Sets the status of a company to active or inactive. If you set the status to inactive, you cannot access the developers*
 *  and apps associated with the company.                                                                                 *
 **************************************************************************************************************************/
module.exports.setCompanyStatus = function (u, p, o, cn, a,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/companies/' + cn,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            },
        qs: {action: a}
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};

/*******************************
 *Updates an existing company. *
 *******************************
 ***********************************************************************************************************************
 Send the complete company record as a payload with any changes you want to make.

 Note that to change the status of the Company you use Set the Status of a Company.
 The attributes in the sample payload below apply to company configuration in monetization. For non-monetized companies,
 you need send only displayName.

 If you want to change the company's billing type (PREPAID to POSTPAID), make sure the organization profile is
 configured to support your setting (for example, set to accept BOTH). See Edit the organization profile.
 ***********************************************************************************************************************/
module.exports.UpdateCompany = function (u, p, o, cn, a,callback) {
    var options = {
        method: 'PUT',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/companies/' + cn,
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