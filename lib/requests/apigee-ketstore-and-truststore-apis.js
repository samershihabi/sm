var request = require("request");
var basic = require('basic-authorization-header');

/*******************************************************************************************************************
 *Create a keystore or truststore in an environment.                                                               *
 *Keystore: Contains the TLS certificate and private key used to identify the entity during TLS handshaking.       *
 *Truststore: Contains trusted certificates on an TLS client used to validate an TLS server's certificate          *
 *presented to the client. These certificates are typically self-signed certificates or certificates that          *
 *are not signed by a trusted CA.                                                                                  *
 *                                                                                                                 *
 *To configure functionality that relies on public key infrastructure (TLS and SAML, for example) you need         *
 *to create keystores and truststores that provide the necessary keys and digital certificates. Keystores          *
 *and truststores define repositories of security certificates used for TLS encryption.                            *
 *                                                                                                                 *
 *The APIs that you use to create a truststore are the same as used to create a keystore. The only difference      *
 *is that you pass the cert file as a PEM file instead of a JAR file.                                              *
 *Keystore names can contain only alphanumeric characters.                                                         *
 ******************************************************************************************************************/
module.exports.createKeystoreAndTruststore = function (u, p, o, env, kt,callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/keystores',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            },
        body: JSON.stringify(kt)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(JSON.stringify(body))
        callback(body,response);
    });
}

/******************************************************
 * Deletes a keystore or truststore in an environment.*
 *****************************************************/
module.exports.deleteKeystoreAndTruststore = function (u, p, o, env, ktn,callback) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/keystores/' + ktn,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(JSON.stringify(body))
        callback(body,response);
    });
}

/**************************************************************************************************************
 * Returns a list of all keystores and truststores in the environment.                                        *
 *In Edge, keystores and truststores are both represented by a keystore entity. That is, the contents of the  *
 *keystore determine if it is used as an TLS keystore or truststore:                                          *
 *keystore - a keystore entity that contains one or more aliases, where each alias contains a cert/key pair.  *
 *truststore - a keystore entity that contains one or more aliases, where each alias contains a cert only.    *
 **************************************************************************************************************/
module.exports.getKeystoreAndTruststoreList = function (u, p, o, env,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/keystores/',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(JSON.stringify(body))
        callback(body,response);
    });
}

/*****************************************************************************************************
 *Returns a specific keystore or truststore in the environment, including the list of keys and certs.*
 ****************************************************************************************************/
module.exports.getKeystoreAndTruststore = function (u, p, o, env, ktn,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/keystores/' + ktn,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(JSON.stringify(body))
        callback(body,response);
    });
}

/***************************************************************************************************************
 *Returns a specific cert from a keystore or truststore. For cert_name, use the certificate alias if it has one.*
 ***************************************************************************************************************/
module.exports.getCert = function (u, p, o, env, ktn, cn,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/keystores/' + ktn + '/certs/' + cn,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(JSON.stringify(body))
        callback(body,response);
    });
}

/*********************************************************************
 * Get all the certificates for the specified keystore or truststore.*
 ********************************************************************/
module.exports.getAllCert = function (u, p, o, env, ktn,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/keystores/' + ktn + '/certs',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(JSON.stringify(body))
        callback(body,response);
    });
}

/********************************************************************************************************************
 * Removes a specific cert from a keystore or truststore. For cert_name, use the certificate alias if it has one.   *
 * Use Get Cert Details from a Keystore or Truststore to view the list of cert aliases in a keystore or truststore. *
 *  If the cert is part of a cert chain, deleting it could cause TLS handshaking to fail.                           *
 *******************************************************************************************************************/
module.exports.deleteCert = function (u, p, o, env, ktn, cn,callback) {
    var options = {
        method: 'DELETE',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/keystores/' + ktn + '/certs/' + cn,
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(JSON.stringify(body))
        callback(body,response);
    });
}

/*********************************************************
 * Export a Certificate from a Keystore or Truststore    *
 ********************************************************/
module.exports.exportCert = function (u, p, o, env, ktn, cn,callback) {
    var options = {
        method: 'GET',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/keystores/' + ktn + '/certs/' + cn + '/export',
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                authorization: basic(u, p)
            }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(JSON.stringify(body))
        callback(body,response);
    });
}

/*************************************************************************************************************************
 * Uploads a certificate to a truststore in an environment.
 *If the cert is part of a chain, then the truststore must contain all certs in the chain, either as individual PEM or
 *DER files or as a single file. If you use a single file, then the certs must be in order where the first cert in the
 *file is the certificate used for TLS followed by the chain of certs, in order, to the CA certificate.
 *The final certificate is typically signed by the certificate issuer. For example, in the truststore,
 *you upload a client certificate, client_cert_1, and the client certificate issuer's certificate, ca_cert.
 *For more information, see KeyStores and TrustStores.
 *
 *This API validates the following:
 *
 *That file size is no larger than 50KB.
 *That the certificate is of type PEM or DER.
 *That the certificate is not expired. To bypass this validation, set ignoreExpiryValidation=true.*
 ***********************************************************************************************************************/
module.exports.uploadCertToTruststore = function (u, p, o, env, ktn, aln, iex, cf,callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/keystores/' + ktn + '/certs',
        qs: {alias: aln, ignoreExpiryValidation: iex},
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream',
                authorization: basic(u, p)
            },
        body: cf
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(JSON.stringify(body))
        callback(body,response);
    });
}

/*************************************************************************************************************************
 *After you've created a keystore in an environment, you can use this API to upload your JAR files that contain a cert and
 *private key. For more information on keystores, see Keystores and Truststores.
 *
 *This API validates the following:
 *
 *That file size is no larger than 50KB.
 *That the certificate is of type PEM or DER.
 *That the certificate is not expired. To bypass this validation, set ignoreExpiryValidation=true.
 ***********************************************************************************************************************/
module.exports.uploadJARToKeystore = function (u, p, o, env, ktn, aln, iex, cf, pw,callback) {
    var options = {
        method: 'POST',
        url: 'https://api.enterprise.apigee.com/v1/organizations/' + o + '/environments/' + env + '/keystores/' + ktn + '/keys',
        qs: {alias: aln, ignoreExpiryValidation: iex, password: pw},
        headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/octet-stream',
                authorization: basic(u, p)
            },
        body: cf
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(JSON.stringify(body))
        callback(body,response);
    });
}
