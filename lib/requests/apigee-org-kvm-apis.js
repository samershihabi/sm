var request = require("request");
var basic = require('basic-authorization-header');


/*********************************************
 *Creates a key value map in an organization.*
 **********************************************/
/*********************************************************************************************************************************************************
 *A key value map is a simple structure for persistently storing name/value pairs as entries in a named map.                                             *
 *The entries in a KVM can be retrieved at runtime by the Key Value Map Operations policy or code running on Apigee Edge.                                *
 *Use KVMs for use cases such as profile-based access control, storing environment-specific data, to control application-specific behavior, and so on.   *
 *You can created an encrypted KVM by adding "encrypted" : "true" to the payload.                                                                        *
 ********************************************************************************************************************************************************/
module.exports.createOrganizationKvm = function (u, p, o, k) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/keyvaluemaps',
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
 *Gets a KeyValueMap in an Organization by name, along with associated entries.*
 *******************************************************************************/
module.exports.getEnvironmentKvm = function (u, p, o, kn) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/keyvaluemaps/' + kn,
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
 *Gets a specific key/value map entry in an Organization based on the key name of the entry.*
 **********************************************************************************************/
module.exports.getorganizationKvmEntry = function (u, p, o, kn, en) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/keyvaluemaps/' + kn + '/entries/' + en,
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


/********************************************************
 *List the name of all KeyValueMaps for an organization.*
 ********************************************************/
module.exports.getOrganizationsKvmList = function (u, p, o) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/keyvaluemaps',
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
 *Deletes a KeyValueMap and all associated entries from an Organization.*
 ************************************************************************/
module.exports.deleteOrganizationKvm = function (u, p, o, kn) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/keyvaluemaps/' + kn,
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


/***************************************************************************************
 *Deletes a single key/value entry in the map of an Organization based on the key name.*
 **************************************************************************************/
module.exports.deleteEnvironmentsKvmEntry = function (u, p, o, kn, en) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/keyvaluemaps/' + kn + '/entry/' + en,
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
 *Creates an entry in an existing KeyValueMap scoped to an organization. A key (name) cannot be larger than 2 KB.*
 ***************************************************************************************************************/
module.exports.createOrganizationRevisionKvm = function (u, p, o, kn, en) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/keyvaluemaps/' + kn'/entries',
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
 *Updates an entry in a KeyValueMap scoped to an organization. A key cannot be larger than 2 KB.*
 **********************************************************************************************/
module.exports.updateEnvironmentKvmEntry = function (u, p, o, kn, en, nen) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/keyvaluemaps/' + kn'/entries/'+en,
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
 *Lists keys in a KeyValueMap scoped to an organization.*
 ******************************************************/
module.exports.getEnvironmentsKvmKeys = function (u, p, o, kn, i, s) {
    var options = {
        method: 'Get',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/keyvaluemaps/' + kn + '/keys?startkey=' + i + '&count=' + s,
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

