var request = require("request");
var basic = require('basic-authorization-header');

/**
 *Generates metadata for an analytics report.
 *For more information on metrics, dimensions, and other report settings, see the custom reports documentation.
 **/
module.exports.createAnalyticsReportDefinition = function (u, p, o, rb) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/reports',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            },
        body: JSON.stringify(rb)

    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
    });
};

/**
 *Gets the contents of a report stored in an organization on Apigee Edge.
 *For the report name, use the "name" value, which is the report's numeric UUID, such as 62d9de1f-9b56-4a27-ad74-14199eb07201.
 *Get this report name by using the list reports API.
 **/
module.exports.getAnalyticsReportDefinition = function (u, p, o, rbn) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/reports/' + rbn,
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
 *Update the definition of an existing report.
 *For the report name, use the 'name' value, which is the report's numeric UUID, such as 62d9de1f-9b56-4a27-ad74-14199eb07201.
 *Get this report name by using the list reports API.
 *IMPORTANT: To update a report, you must send the entire report definition that includes your report updates;
 *otherwise the report definition is rewritten to include only the updated properties.
 *For more information on metrics, dimensions, and other report settings, see the custom reports documentation.
 **/
module.exports.updateAnalyticsReportDefinition = function (u, p, o, rbn, rb) {
    var options = {
        method: 'PUT',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/reports/' + rbn,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            },
        body: JSON.stringify(rb)

    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
    });
};

/**
 *Delete a report from an organization.
 *For the report name, use the "name" value, which is the report's numeric UUID, such as 62d9de1f-9b56-4a27-ad74-14199eb07201.
 *Get this report name by using the list reports API.
 **/
module.exports.deleteAnalyticsReportDefinition = function (u, p, o, rbn) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/reports/' + rbn,
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
 *Lists all the reports in an organization.
 *The report name is the report's numeric UUID, such as 62d9de1f-9b56-4a27-ad74-14199eb07201.
 **/
module.exports.getAnalyticsReportDefinitionsList = function (u, p, o) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/reports',
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