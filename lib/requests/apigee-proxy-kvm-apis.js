var request = require("request");
var basic = require('basic-authorization-header');

/****************************************************************
 * Creates a key value map (KVM) for a single API proxy:          *
 *****************************************************************/
/*********************************************************************************************************************************************************
 *A key value map is a simple structure for persistently storing name/value pairs as entries in a named map.                                               *
 *The entries in a KVM can be retrieved at runtime by the Key Value Map Operations policy or code running on Apigee Edge.                                  *
 *Use KVMs for use cases such as profile-based access control, storing environment-specific data, to control application-specific behavior, and so on.     *
 *You can created an encrypted KVM by adding "encrypted" : "true" to the payload. You update encrypted KVMs the same way you update non-encrypted KVMs.    *
 ***********************************************************************************************************************************************************/
module.exports.createProxyKvm = function (u, p, o, pn, k,callback) {
    var options;
    options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis/' + pn + '/keyvaluemaps',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            },
        body: JSON.stringify(k)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
};


/***************************************************************************
 *Gets a KeyValueMap in an API proxy by name, along with associated entries.*
 ***************************************************************************/
module.exports.getProxyKvm = function (u, p, o, pn,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis/' + pn + '/keyvaluemaps',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            }
    }

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
}


/*********************************************************************************************
 *Gets a specific key/value map entry in an API proxy by name, along with associated entries.*
 *********************************************************************************************/
module.exports.getProxyKvmEntry = function (u, p, o, kn, en,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis/' + pn + '/keyvaluemaps/' + kn + '/entries/' + en,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            }
    }

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
}


/********************************************************************************************************************************
 *List the name of all KeyValueMaps for an API proxy, and optionally returns an expanded view of all KeyValueMaps for the proxy.*
 ********************************************************************************************************************************/
module.exports.getProxyKvmList = function (u, p, o, pn,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis/' + pn + '/keyvaluemaps',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            }
    }

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
}


/********************************************************************
 *Deletes a KeyValueMap and all associated entries from an API proxy.*
 *******************************************************************/
module.exports.deleteProxyKvm = function (u, p, o, pn, kn,callback) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis/' + pn + '/keyvaluemaps/' + kn,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            }
    }

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
}


/************************************************************************************************
 *Deletes a specific key/value map entry in an API proxy by name, along with associated entries.*
 ************************************************************************************************/
module.exports.deleteProxyKvmEntry = function (u, p, o, pn, kn, en,callback) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis/' + pn + '/keyvaluemaps/' + kn + '/entry/' + en,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            }
    }

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
}


/*********************************************************************************************
 *Updates an entry in a KeyValueMap scoped to an API proxy. A key cannot be larger than 2 KB.*
 *********************************************************************************************/
module.exports.updateProxyKvmEntry = function (u, p, o, pn, kn, en, nen,callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis/' + pn + '/keyvaluemaps/' + kn + '/entries/' + en,
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

        callback(body,response);
    });
}


/****************************************************
 *Lists keys in a KeyValueMap scoped to an API proxy.*
 ****************************************************/
module.exports.getProxyKvmKeys = function (u, p, o, pn, kn, i, s,callback) {
    var options = {
        method: 'Get',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis/' + pn + '/keyvaluemaps/' + kn + '/keys?startkey=' + i + '&count=' + s,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            }
    }

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
}

/********************************************************
 *Creates a KeyValueMap scoped to an API proxy revision.*
 *******************************************************/
module.exports.createProxyRevisionKvm = function (u, p, o, on, pr, k,callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis/' + pn + '/revision/' + pr + '/keyvaluemaps/',
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

        callback(body,response);
    });
}

/************************************************************************************************************************
 *Creates an entry in an existing KeyValueMap scoped to an API proxy revision. A key (name) cannot be larger than 2 KB.  *
 ************************************************************************************************************************/
module.exports.createProxyRevisionKvm = function (u, p, o, pn, pr, kn, en,callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis/' + pn + '/revision/' + pr + '/keyvaluemaps/' + kn + '/entries',
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

        callback(body,response);
    });
}

/******************************************************************************************************
 *Updates an entry in a KeyValueMap scoped to an API proxy revision. A key cannot be larger than 2 KB.*
 *****************************************************************************************************/
module.exports.updateProxyKvmEntry = function (u, p, o, pn, pr, kn, en, nen,callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis/' + pn + '/revision/' + pr + '/keyvaluemaps/' + kn + '/entries/' + en,
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

        callback(body,response);
    });
}

/**************************************************************
 *Lists keys in a KeyValueMap scoped to an API proxy revision.*
 *************************************************************/
module.exports.getProxyRevisionKvmKeys = function (u, p, o, pn, pr, kn, i, s,callback) {
    var options = {
        method: 'Get',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/apis/' + pn + '/revision/' + pr + '/keyvaluemaps/' + kn + '/keys?startkey=' + i + '&count=' + s,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            }
    }

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        callback(body,response);
    });
}