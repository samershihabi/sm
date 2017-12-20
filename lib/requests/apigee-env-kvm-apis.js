var request = require("request");
var basic = require('basic-authorization-header');


/*********************************************
 * Creates a key value map in an environment.*
 **********************************************/
/*********************************************************************************************************************************************************
 * A key value map is a simple structure for persistently storing name/value pairs as entries in a named map.                                              *
 * The entries in a KVM can be retrieved at runtime by the Key Value Map Operations policy or code running on Apigee Edge.                                 *
 * Use KVMs for use cases such as profile-based access control, storing environment-specific data, to control application-specific behavior, and so on.    *
 * You can created an encrypted KVM by adding "encrypted" : "true" to the payload.                                                                         *
 ***********************************************************************************************************************************************************/
module.exports.createEnviromentKvm = function (u, p, o, env, k) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/enviroments/' + env + '/keyvaluemaps',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            },
        body: JSON.stringify(k)
    }

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
    });
}


/********************************************************************************
 *Gets a key/value map in an environment by name, along with associated entries.*
 *******************************************************************************/
module.exports.getEnvironmentKvm = function (u, p, o, env) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/keyvaluemaps',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            }
    }

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
    });
}


/***********************************************************************************************
 *Gets a specific key/value map entry in an environment by name, along with associated entries.*
 **********************************************************************************************/
module.exports.getEnvironmentKvmEntry = function (u, p, o, env, kn, en) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/keyvaluemaps/' + kn + '/entries/' + en,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            }
    }

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
    });
}


/*******************************************************************************************************************************************
 *Lists the name of all key/value maps in an environment and optionally returns an expanded view of all key/value maps for the environment.*
 ******************************************************************************************************************************************/
module.exports.getEnvironmentKvmList = function (u, p, o, env) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/Environments/' + env + '/keyvaluemaps',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            }
    }

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
    });
}

/*************************************************************************
 *Deletes a key/value map and all associated entries from an environment.*
 ************************************************************************/
module.exports.deleteEnvironmentKvm = function (u, p, o, env, kn) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/keyvaluemaps/' + kn,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            }
    }

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
    });
}


/**************************************************************************************************
 *Deletes a specific key/value map entry in an environment by name, along with associated entries.*
 *************************************************************************************************/
module.exports.deleteEnvironmentsKvmEntry = function (u, p, o, env, kn, en) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/keyvaluemaps/' + kn + '/entry/' + en,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            }
    }

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
    });
}

/****************************************************************************************************************
 *Creates an entry in an existing KeyValueMap scoped to an environment. A key (name) cannot be larger than 2 KB.*
 ***************************************************************************************************************/
module.exports.createEnvironmentRevisionKvm = function (u, p, o, env, kn, en) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/keyvaluemaps/' + kn + '/entries',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            },
        body: JSON.stringify(en)
    }

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
    });
}

/***********************************************************************************************
 *Updates an entry in a KeyValueMap scoped to an environment. A key cannot be larger than 2 KB.*
 **********************************************************************************************/
module.exports.updateEnvironmentKvmEntry = function (u, p, o, env, kn, en, nen) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/keyvaluemaps/' + kn + '/entries/' + en,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            },
        body: JSON.stringify(nen)
    }

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
    });
}


/*******************************************************
 *Lists keys in a KeyValueMap scoped to an environment.*
 ******************************************************/
module.exports.getEnvironmentsKvmKeys = function (u, p, o, env, kn, i, s) {
    var options = {
        method: 'Get',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/keyvaluemaps/' + kn + '/keys?startkey=' + i + '&count=' + s,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            }
    }

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
    });
}

