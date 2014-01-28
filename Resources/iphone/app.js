var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.Facebook = require("facebook");

var myApp = {
    facebook: Alloy.Globals.Facebook,
    parse: require("com.elijahwindsor.parsemodule")
};

console.log(Ti.App.Properties.getString("ti.facebook.appid"));

myApp.facebook.appid = Ti.App.Properties.getString("ti.facebook.appid");

myApp.facebook.permissions = [ "email" ];

myApp.parse.initParse({
    appId: "5J3HfUVCwzRgCLSNYI86fLmSLowAxKJhiBj2xqWO",
    clientKey: "1bfUu4MNq17mNIcH0gljFbANCc6OPiHCQMXQoG0S"
});

Alloy.createController("index");