var dir = require('node-dir');
var in_array = require('in_array');


/****************************************************************************************************
 *this method will check if the dir is a valid apigee proxy dir (proxies,targets,Policies,resources)*
 ***************************************************************************************************/
module.exports.apiProxyDirsCheck = function (dirname) {
    var paths = ['proxies', 'targets', 'policies', 'resources'];
    dir.subdirs(dirname, function (err, files) {
        if (err) throw err;
        paths.map(function (path) {
            var result = in_array(dirname + '/' + path, files);
            if (!result) throw 'can not find ' + path + ' under proxy dir';
        });
    }, {shortName: true, recursive: false});
};




