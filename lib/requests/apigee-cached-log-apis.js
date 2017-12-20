var request = require("request");
var basic = require('basic-authorization-header');


/****************************************************************************************************************
 *Retrieves the names of the available cached log categories. Currently, "nodejs" is the only category supported.*
 *****************************************************************************************************************/

module.exports.getCachedLogCategories = function (u, p, o, an) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/apis/' + an + '/cachedlogs/categories',
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

        return body;
    });
}

/*******************************************************************************
 *Retrieve the most recent number of Node.js log records for the specified API.*
 *******************************************************************************
 *********************************************************************************************************************************************************************************
 *The exact number of log records retrieved may change depending on system configuration, but it will typically be 500 for each message processor or 1000 in most configurations.*
 *The response format is as follows: [TIMESTAMP CATEGORY SERVER] Record...                                                                                                       *
 *TIMESTAMP is the time at which the log record was generated.                                                                                                                   *
 *CATEGORY denotes that the log is a node.js log and whether it went to stdout or stderr.                                                                                        *
 *SERVER uniquely identifies the server within Apigee Edge where the log was generated. For example: [2014-10-09T00:58:17.619Z nodejs/stdout svr.701] Hello, World!              *
 *********************************************************************************************************************************************************************************/
module.exports.getCachedLogNodejs = function (u, p, o, an, tz, gst, st) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/apis/' + an + '/cachedlogs/categories/nodejs?tz=' + tz + '&getState=' + gst + '&state=' + st,
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

        return body;
    });
}