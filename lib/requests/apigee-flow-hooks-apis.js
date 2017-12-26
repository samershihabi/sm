var request = require("request");
var basic = require('basic-authorization-header');


/**
 * Gets information about the flow hook to which the the shared flow is attached. If the shared flow isn’t attached to
 * a flow hook this returns no flow hook name.
 */
module.exports.getFlowHook = function (u, p, o, env, fh) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/enviroments/' + env + '/flowhooks/' + fh,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream',
                authorization: basic(u, p)
            }

    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
    });
};

/**
 *Attaches a shared flow to a flow hook. When attached to a flow hook, the shared flow will execute (at the flow hook’s
 *position) for every request to a deployed API proxy in that organization.
 **/
module.exports.attachSharedFlowToFlowHook = function (u, p, o, env, fh, shb) {
    var options = {
        method: 'PUT',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/enviroments/' + env + '/flowhooks/' + fh,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream',
                authorization: basic(u, p)
            },
        body: shb

    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
    });
};

/**
 *Detaches a shared flow from a flow hook. If no shared flow is attached, this will not return an error. Only one shared
 *flow at a time can be attached to a flow hook.
 **/
module.exports.dattachSharedFlowToFlowHook = function (u, p, o, env, fh, shb) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/enviroments/' + env + '/flowhooks/' + fh,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream',
                authorization: basic(u, p)
            }

    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
    });
};