var request = require("request");
var basic = require('basic-authorization-header');


/*******************************************************************************************************************************************************************
 *Creates an API Proxy. The API proxy that is created using this call will not be accessible at runtime until the proxy is deployed to an environment.             *
 * Usually, this request is followed up with an export API proxy method call, which exports the API proxy bundle to the developer's local machine for development. *
 ******************************************************************************************************************************************************************/
module.exports.createApiProxy = function (u, p, o, pr, callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis',
        qs: {action: 'clear'},
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            },
        body: JSON.stringify(pr)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        callback(body,response);
    });
};

/***************************************************************************************************************************************************
 *Deletes an API proxy and all associated endpoints, policies, resources, and revisions. The API proxy must be undeployed before you can delete it.*
 **************************************************************************************************************************************************/
module.exports.deleteApiProxy = function (u, p, o, prn, callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis/' + prn,
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


/***********************************************************************************************************************
 *Uploads a ZIP-formatted API proxy configuration bundle from a local machine to an existing revision of an API proxy.*
 *If the API proxy revision is deployed, the API undeploys the revision, updates it, and then redeploys it.            *
 *If the API proxy revision is undeployed, the API updates the revision but does not deploy it.                        *
 **********************************************************************************************************************/
module.exports.updateApiProxyRevision = function (u, p, o, prn, re, fp, v, callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis/' + prn + '/revisions/' + re,
        qs: {validate: v},
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
        callback(body,response);
    });
};


/***********************************************************************************************************************
 *Uploads a ZIP-formatted API proxy configuration bundle from a local machine to an organization on Edge. If the API   *
 *proxy already exists, then create a new revision of the API proxy. If the API proxy does not exist, then create it.  *
 *Once imported, the API revision must be deployed before it can be accessed at runtime.                               *
 *By default, API proxy configurations are not validated on import:                                                    *
 *To validate the API proxy definition on import, set the validate query parameter to true. Invalid API proxy          *
 *configurations are rejected, and a list of validation errors returned to the client.                                 *
 *To validate the API only but not import it, set the action query parameter to validate.                              *
 *In the following cURL example, Content-Type is automatically set to multipart/form-data                              *
 **********************************************************************************************************************/

module.exports.importNewApiProxy = function (u, p, o, prn, fp, callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis',
        qs: {action: 'import', name: prn, validate: true},
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
        callback(body,response);
    });
}


/***********************************************************************************************************************
 *Deletes a revision of an API proxy and all policies, resources, endpoints, and revisions associated with it. The API *
 *proxy revision must be undeployed before you can delete it.                                                          *
 **********************************************************************************************************************/
module.exports.deleteApiProxyRevision = function (u, p, o, prn, r, callback) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis/' + prn + '/revisions/' + r,
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
}

/************************************************************************************************************************
 *Deploys a revision of an API proxy to an environment in an organization. API proxies cannot be invoked until they have*
 *been deployed to an environment.                                                                                      *
 *If you experience HTTP 500 errors during API proxy deployment, see Seamless deployment (zero downtime) in Deploy API  *
 *proxies using the management API for information on using the override and delay parameters. That topic also has more *
 *details on API proxy deployment.                                                                                      *
 ***********************************************************************************************************************/
module.exports.deployApiProxyRevision = function (u, p, o, env, prn, r, d, or, callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/apis/' + prn + '/revisions/' + r + '/deployments',
        qs: {delay: d, override: or},
        headers:
            {
                'cache-control': 'no-cache',
                authorization: basic(u, p)
            }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        callback(body,response);
    });
}

/***********************************************************************************************************************
 * Outputs an API proxy revision as a ZIP formatted bundle of code and config files. This enables local configuration  *
 * and development, including attachment of policies and scripts.                                                      *
 *For example, if you were to call this API with cURL, you could export the API proxy to a local ZIP file by adding -o *
 *{file_name}.zip to the cURL command:                                                                                 *
 *curl https://api.enterprise.apigee.com/v1/o/myOrg/apis/myProxy/revisions/1?format=bundle                             *
 *-u myEMail:myPWord -o myProxy.zip                                                                                    *
 ***********************************************************************************************************************/
module.exports.exportApiProxyRevision = function (u, p, o, env, prn, r, f, callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/apis/' + prn + '/revisions/' + r,
        qs: {format: f},
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
}

/***********************************************************************************
 * Gets an API proxy by name, including a list of existing revisions of the proxy. *
 **********************************************************************************/
module.exports.getApiProxyByName = function (u, p, o, env, prn, callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/apis/' + prn,
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
}

/*********************************************
 * Gets a specific revision of an API proxy. *
 ********************************************/
module.exports.getApiProxyRevisionByName = function (u, p, o, env, prn, r, callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/apis/' + prn + '/revisions/' + r,
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
}

/*********************************************
 * Gets the names of all API proxies in an   *
 * organization. The names correspond to the *
 * names defined in the configuration files  *
 * for each API proxy.                       *
 ********************************************/
module.exports.getListApiProxies = function (u, p, o, callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis',
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
}

/*********************************************
 * List all revisions for an API proxy.      *
 ********************************************/
module.exports.getApiProxyAllRevisions = function (u, p, o, prn, callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis/' + prn + '/revisions',
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
}

/****************************************************************************************
 *Undeploys an API proxy revision from an environment.                                  *
 *You must specify the revision number of the API proxy because multiple revisions of   *
 *the same API Proxy can be deployed in the same environment if the proxy base path is  *
 *different.                                                                            *
 *See Force Undeploy API Proxy for the API to force the undeployment of an API.         *
 ***************************************************************************************/
module.exports.undeployApiProxy = function (u, p, o, env, prn, r, callback) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/enviroments/' + env + '/apis/' + prn + '/revisions/' + r + '/deployments',
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
}

/***********************************************************************************************
 *Force the undeployment of the API proxy that is partially deployed. This can be necessary    *
 *if the API proxy becomes partially deployed and must be undeployed, then redeployed.         *
 *You must specify the revision number of the API proxy because multiple revisions of the      *
 *same API Proxy can be deployed in the same environment if the proxy base path is different.  *
 *See Undeploy API Proxy for the standard undeploy API.                                        *
 **********************************************************************************************/
module.exports.forceUndeployApiProxy = function (u, p, o, env, prn, r, callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis/' + prn + '/revisions/' + r + '/deployments',
        qs: {action: 'undeploy', env: env, force: 'force'},
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
}

/*****************************************
 *Gets npm dependencies for an API Proxy.*
 ****************************************/
module.exports.getApiProxyNpmDependencies = function (u, p, o, env, prn, r, callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis/' + prn + '/revisions/' + r + '/npm',
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
}

/******************************
 * Manage Node Package Modules*
 ******************************/
/**
 Runs a specified npm command for an API proxy deployed on Apigee Edge. When you call this API, it is equivalent to
 executing an npm command in the resources/node directory of the API proxy.
 Valid npm commands that you can execute with this API are:
 install
 update
 outdated
 dedupe
 production (see the note below)
 prune
 verbose (directs npm to produce more output)
 ls (default if no query param is specified)
 Usage: Specify the body of this API like this: "command={npm-command}". For example: command=install. The command
 is designed to install known dependencies for the API's package directory (resources/node).

 Do not try to specify an arbitrary published Node.js package name with this API. For example, something like this
 will fail: command=install async.
 With the exception of ls and outdated, all of these commands replace node_modules.zip and any other ZIP file in
 resources/node with the prefix node_modules with a new set of files that contains the updated dependencies.

 For details about these individual npm commands, see https://docs.npmjs.com/cli/.

 When you're installing modules that are used from JavaScript within a proxy, you must deploy (or re-deploy) the proxy
 after the modules are installed. Otherwise, JavaScript code in the proxy might not be able to find required modules.
 By default, this API does not install dependencies in package.json that are listed as "devDependencies". (Node.js
 module authors use "devDependencies" to denote modules that are required for testing and development but not to
 actually run the module.) You can override the default behavior by passing the parameter production=false. For example:
 curl http://host:port/v1/o/ORG/apis/API/revisions/REV/npm -d 'command=install&production=false'

 Example 1:

 command=ls

 Returns a list of Node.js dependencies.

 Example 2:

 command=install

 Installs all dependencies for the resources/node directory.
 * **/
module.exports.getApiProxyNpmManagment = function (u, p, o, env, prn, r, vrb, cmd, callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis/' + prn + '/revisions/' + r + '/npm',
        qs: {verbos: vrb},
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/x-www-form-urlencoded',
                authorization: basic(u, p)
            },
        body: cmd
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        callback(body,response);
    });
}

