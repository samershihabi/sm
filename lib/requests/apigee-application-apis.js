var request = require("request");
var basic = require('basic-authorization-header');

/****************************************************
 * Returns the app profile for the specified app ID.*
 ***************************************************/
module.exports.getApplicationById = function (u, p, o, id,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apps/' + id,
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

/*******************************************************************************************************************************************************
 * Returns a list of app IDs within an organization that have the specified app status. Valid values for the status parameter are: approved or revoked.*
 ******************************************************************************************************************************************************/
module.exports.getApplicationByStatus = function (u, p, o, st, x, i, s,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apps?status=' + st + '&expand=' + x + '&startKey=' + i + '&rows=' + s,
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

/*********************************************************************************************************************************************************
 * Lists app IDs by app type. Valid app types are developer (which returns all developer apps) and company (which returns all company apps).             *
 *********************************************************************************************************************************************************/
module.exports.getApplicationIdByType = function (u, p, o, t, i, s,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apps?apptype=' + t + '&startKey=' + i + '&rows=' + s,
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

/************************************************************************************************************************
 *List app IDs in an organization. You can return the full profile for each app by including the expand query parameter.*
 * You can also choose to include consumer and secret keys in the expanded results.                                     *
 ************************************************************************************************************************/
module.exports.getAllApplicationInOrgainzation = function (u, p, o, crd, x, i, s,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apps?includeCred=' + crd + '&expand=' + x + '&startKey=' + i + '&rows=' + s,
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

/****************************************************
 *Lists, by ID, all apps contained in an app family.*
 ***************************************************/
module.exports.getApplicationIdInAppFamily = function (u, p, o, f, i, s,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apps?appfamily=' + f + '&startKey=' + i + '&rows=' + s,
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

/****************************************************
 *creates an app and connects it with a developer using de (developer email)*
 ***************************************************/
module.exports.createApp = function(u, p, o, de, b,callback) {
  var options = { method: 'POST',
  url: 'https://api.enterprise.apigee.com/v1/organizations/'+o+'/developers/'+de+'/apps',
  headers:
   {
     'cache-control': 'no-cache',
     'content-type': 'application/json',
     authorization: basic(u, p)
   },
  body: b,
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
  callback(body,response);
});
};
