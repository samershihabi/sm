const fs = require('fs');
const _ = require('underscore');
const util = require('../utils.js');
const ziputils = require('../ziputils.js');
const kvms = require('../requests/apigee-env-kvm-apis.js');
const caches = require('../requests/apigee-cache-apis.js');
const sharedflow = require('../requests/apigee-sharedflows-apis.js');
const apis = require('../requests/apigee-api-proxy-apis.js');
const products = require('../requests/apigee-product-apis.js');
const developers = require('../requests/apigee-developers-apis.js');
const apps = require('../requests/apigee-application-apis.js');
const deployment = require('../requests/apigee-deployment-apis');


//to parse the configuration file and extract the properties of each environment
module.exports.autodeployment = function (answers) {
    try {
        var config = JSON.parse(fs.readFileSync(answers.config_file_path, 'utf8'));
        if (answers.environments) {
            var environmentsArray = environments_to_array(answers.environments);
            environmentsArray.map(function (environment_name) {
                environment_name = environment_name.trim();
                environment_name = environment_name.toLowerCase();
                environment_properties_handler(answers, config, environment_name, config.environment[environment_name]);
            });

        } else {
            _.each(config.environment, function (env, env_name) {
                environment_properties_handler(answers, config, env_name, env);
            });
        }
    } catch (e) {
        console.log(e);
    }
}

// turns environments that the user inputs into an array
function environments_to_array(env_input) {
    var env_array = env_input.split(",");
    return env_array;
}


//to prepare the environment with the prerequisite for the deployment process
function environment_properties_handler(answers, config, env_name, env) {
    var components = _.keys(env);
    if (config.api) {
        deploy_apiproxy(answers, config, env_name);
    }
    _.each(components, function (key) {
        switch (key) {
            case "cache":
                console.log("Creating cache");
                var component = env[key];
                component.map(cache_body => {
                    caches.createCache(answers.username, answers.password, config.organization, env_name, cache_body, function (body, response) {
                        //cache creation status
                        if (response.statusCode === 201) {
                            var cache_name = body.name;
                            util.status_logger("cache", cache_name, "success");
                        } else {
                            console.log(body.message);
                        }
                    });
                });
                break;
            case "kvm":
                console.log("Creating KVM");
                var component = env[key];
                component.map(kvm_body => {
                    kvms.createEnvironmentKvm(answers.username, answers.password, config.organization, env_name, kvm_body, function (body, response) {
                        //kvm creation status
                        if (response.statusCode === 201) {
                            var cache_name = body.name;
                            util.status_logger("kvm", cache_name, "success");
                        } else {
                            console.log(body.message);
                        }
                    });
                });
                break;
            case "sharedflow":
                console.log("Deploying sharedflow");
                var component = env[key];
                component.map(sharedflow_body => {
                    deploy_shared_flow(answers, config, sharedflow_body, env_name);
                });
                break;
            case "product":
                console.log("Creating API product");
                var component = env[key];
                component.map(product_body => {
                    products.createProduct(answers.username, answers.password, config.organization, product_body, function (body, response) {
                        //product creation status
                        if (response.statusCode === 201) {
                            var cache_name = body.name;
                            util.status_logger("product", cache_name, "success");
                        } else {
                            console.log(body.message);
                        }
                    });
                });
                break;
            case "developer":
                console.log("Creating developer");
                var component = env[key];
                component.map(developer_body => {
                    de = developer_body.email;
                    developers.createDeveloper(answers.username, answers.password, config.organization, developer_body, function (body, response) {
                        //developer creation status
                        if (response.statusCode === 201) {
                            var cache_name = body.name;
                            util.status_logger("developer", cache_name, "success");
                        } else {
                            console.log(body.message);
                        }
                    });
                });
                break;
            case "app":
                var component = env[key];
                component.map(app_body => {
                    apps.createApp(answers.username, answers.password, config.organization, de, app_body, function (body, response) {
                        //application creation status
                        if (response.statusCode === 201) {
                            var cache_name = body.name;
                            util.status_logger("application", cache_name, "success");
                        } else {
                            console.log(body.message);
                        }
                    });
                });
                break;
            default:
                console.log("Undefined Key: " + key);
        }


    });

}

//imports a sharedflow bundle and deploys it
function deploy_shared_flow(answers, config, sharedflow_body, env_name) {
    ziputils.zipDirectory(answers.sharedflow_file_path, 'sharedflowbundle', function (err, zipBuf) {
        if (err) throw new Error(err);
        // importing sharedflow zip file without deploying
        sharedflow.importNewSharedFlows(answers.username, answers.password, config.organization, sharedflow_body.name, zipBuf, function (body, response) {
            //validate sharedflow importing status
            //then depolying sharedflow
            if (response.statusCode === 201) {
                util.status_logger("importing sharedflow", sharedflow_body.name, "success");
                sharedflow.deploySharedFlowsRevisionToEnviroment(answers.username, answers.password, config.organization, env_name, sharedflow_body.name, 1, function (body, response) {
                    //validate sharedflow deployment status.
                    if (response.statusCode === 201) {
                        util.status_logger("deploying sharedflow", sharedflow_body.name, "success");
                    } else {
                        util.status_logger("deploying sharedflow", sharedflow_body.name, "failed, message:" + body.message);
                    }
                });
            } else {
                util.status_logger("importing sharedflow", sharedflow_body.name, "failed, message:" + body.message);
            }

        });


    });
}

function deploy_apiproxy(answers, config, env_name) {
    var prn = config.api.proxyname;
    ziputils.zipDirectory(answers.proxy_path, 'apiproxy', function (err, zipBuf) {
        if (err) throw new Error(err);
        //get the deployment status for the proxy then undeploy the proxy from the wanted environment before deploy the new revision of the API proxy.
        deployment.getApiProxyDeploymentDetails(answers.username, answers.password, config.organization, prn, function (body, response) {
            if (response.statusCode === 404) {
                //if the apiproxy is not already deployed or imported create it and deploy it to the requested environments.
                apis.importNewApiProxy(answers.username, answers.password, config.organization, prn, zipBuf, function (body, response) {
                    if (response.statusCode === 201) {
                        util.status_logger("Apiproxy importing", prn, "success");
                        apis.deployApiProxyRevision(answers.username, answers.password, config.organization, env_name, prn, body.revision, config.api.delay, config.api.override, function (body, response) {
                            //validate the status of Apiproxy deployment
                            if (response.statusCode === 201) util.status_logger("Apiproxy deployment", prn, "success");
                        });
                    } else {
                        util.status_logger("Apiproxy deployment", prn, "failed. Because " + body.message)
                    }
                });
            } else if (response.statusCode === 200) {
                console.log(body);
                //if the Apiproxy already had been deployed get the deployed version to be undeployed
                //     //if the proxy already imported and deployed to one of the environments of the organization. get the revision number that had been deployed to the requested environment(env_name)
                if (body.environment) {
                    if (body.environment[env_name]) {
                        var revision_number = body.environment[env_name].revision.name;
                        if (revision_number) {
                            //to get the deployed revision and undeploy it
                            apis.forceUndeployApiProxy(answers.username, answers.password, config.organization, env_name, prn, revision_number, function (body, response) {
                                if (response.statusCode === 200) {
                                    util.status_logger("force undeploy Apiproxy", prn + " revision " + revision_number, "success");
                                    apis.importNewApiProxy(answers.username, answers.password, config.organization, prn, zipBuf, function (body, response) {
                                        if (response.statusCode === 201) {
                                            util.status_logger("Apiproxy importing", prn, "success");
                                            apis.deployApiProxyRevision(answers.username, answers.password, config.organization, env_name, prn, body.revision, config.api.delay, config.api.override, function (body, response) {
                                                //validate the status of Apiproxy deployment
                                                if (response.statusCode === 201) util.status_logger("Apiproxy deployment", prn, "success");
                                            });
                                        } else {
                                            util.status_logger("Apiproxy deployment", prn, "failed. Because " + body.message)
                                        }
                                    });

                                } else {
                                    console.log(body.message);
                                }
                            });

                        }
                    }else{
                        apis.importNewApiProxy(answers.username, answers.password, config.organization, prn, zipBuf, function (body, response) {
                            if (response.statusCode === 201) {
                                util.status_logger("Apiproxy importing", prn, "success");
                                apis.deployApiProxyRevision(answers.username, answers.password, config.organization, env_name, prn, body.revision, config.api.delay, config.api.override, function (body, response) {
                                    //validate the status of Apiproxy deployment
                                    if (response.statusCode === 201) util.status_logger("Apiproxy deployment", prn, "success");
                                });
                            } else {
                                util.status_logger("Apiproxy deployment", prn, "failed. Because " + body.message)
                            }
                        });
                    }
                } else {
                    apis.importNewApiProxy(answers.username, answers.password, config.organization, prn, zipBuf, function (body, response) {
                        if (response.statusCode === 201) {
                            util.status_logger("Apiproxy importing", prn, "success");
                            apis.deployApiProxyRevision(answers.username, answers.password, config.organization, env_name, prn, body.revision, config.api.delay, config.api.override, function (body, response) {
                                //validate the status of Apiproxy deployment
                                if (response.statusCode === 201) util.status_logger("Apiproxy deployment", prn, "success");
                            });
                        } else {
                            util.status_logger("Apiproxy deployment", prn, "failed. Because " + body.message)
                        }
                    });
                }
            }


        });
    });
}

