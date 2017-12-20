var kvm = require('./lib/requests/apigee-proxy-kvm-apis');


var req = {
    "username": "saleh-jaz1@hotmail.com",
    "password": "P@$$w0rd",
    "org": "salehmashal",
    "api": "oauth",
    "kvm": {
        "name": "Map_name1",
        "encrypted": "true",
        "entry": [
            {
                "name": "Key1",
                "value": "value_one"
            },
            {
                "name": "Key2",
                "value": "value_two"
            }
        ]
    }

}
kvm.createProxyKvm(req);
kvm.getProxyKvm(req);
kvm.getProxyKvmEntry(req);
kvm.getProxyKvmList(req);
kvm.deleteProxyKvm(req);
kvm.deleteProxyKvmEntry(req);