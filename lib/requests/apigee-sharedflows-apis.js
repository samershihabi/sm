var request = require("request");
var basic = require('basic-authorization-header');


/**
 *Gets an array of the names of shared flows in the organization. The response is a simple array of strings.
 **/
module.exports.getSharedFlowsList = function (u, p, o,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/sharedflows',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream',
                authorization: basic(u, p)
            }

    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};

/**
 *Uploads a ZIP-formatted shared flow configuration bundle from a local machine to an Edge organization. If the shared
 *flow already exists, this creates a new revision of it. If the shared flow does not exist, this creates it.
 *Once imported, the shared flow revision must be deployed before it can be accessed at runtime. By default, shared flow
 *configurations are not validated on import.
 */
module.exports.importNewSharedFlows = function (u, p, o, prn, fp,callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/sharedflows',
        qs: {action: 'import', name: prn,validate:true},
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream',
                authorization: basic(u, p)
            },
        body: fp
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        console.log("=================================================");
        console.log("============  SHARED FLOW IMPORTED  =============");
        console.log("=================================================");
        callback(body,response);
    });

};

/**
 * Gets a shared flow by name, including a list of its revisions.
 */
module.exports.getSharedFlowsByName = function (u, p, o, shn,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/sharedflows/' + shn,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream',
                authorization: basic(u, p)
            }

    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};

/**
 *Deletes shared flow and all associated policies, resources, and revisions. You must undeploy the shared flow before
 *deleting it.
 **/
module.exports.deleteSharedFlowsByName = function (u, p, o, shn,callback) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/sharedflows/' + shn,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream',
                authorization: basic(u, p)
            }

    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};

/**
 *Outputs a shared flow revision as a ZIP-formatted bundle of code and config files.
 *For example, if you were to call this API with cURL, you could export the shared flow to a local ZIP
 **/
module.exports.exportSharedFlowsByName = function (u, p, o, shn, r,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/sharedflows/' + shn + 'revision/' + r,
        qs: {format: 'bundle'},
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream',
                authorization: basic(u, p)
            }

    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};

/**
 *Deploys a shared flow revision to an environment in an organization. Shared flows cannot be used until they have been
 *deployed to an environment.
 *If you experience HTTP 500 errors during deployment, consider using the override parameter to deploy the shared flow
 *in place of a revision currently deployed.
 *The size limit of a shared flow bundle is 15 MB.
 **/
module.exports.deploySharedFlowsRevisionToEnviroment = function (u, p, o, env, shn, r,callback) {
  var options = { method: 'POST',
    url: 'https://api.enterprise.apigee.net/v1/organizations/'+o+'/environments/'+env+'/sharedflows/'+shn+'/revisions/'+r+'/deployments',
    qs: { override: 'true' },
    headers:
     {
       'cache-control': 'no-cache',
       authorization: basic(u,p)
     }
    };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
    console.log("=================================================");
    console.log("============= SHARED FLOW DEPLOYED ==============");
    console.log("=================================================");
    callback(body,response);
  });

};

/**
 *Undeploys a shared flow revision from an environment.
 *You must specify the shared flow revision number.
 **/
module.exports.undeploySharedFlowsRevisionToEnviroment = function (u, p, o, env, shn, r,callback) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environment/' + env + '/sharedflows/' + shn + '/revisions/' + r + '/deployments',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream',
                authorization: basic(u, p)
            }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body)
        callback(body,response);
    });
};

/**
 *Gets an array of the environments to which the shared flow is deployed.
 **/
module.exports.getDeploymentEnviromentsForSharedFlows = function (u, p, o, env, shn, r,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environment/' + env + '/sharedflows/' + shn + '/revisions/' + r + '/deployments',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream',
                authorization: basic(u, p)
            }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body)
        callback(body,response);
    });
};
