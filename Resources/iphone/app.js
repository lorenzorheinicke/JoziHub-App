var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.Facebook = require("facebook");

var myApp = {
    facebook: Alloy.Globals.Facebook
};

console.log(Ti.App.Properties.getString("ti.facebook.appid"));

myApp.facebook.appid = Ti.App.Properties.getString("ti.facebook.appid");

myApp.facebook.permissions = [ "email" ];

Alloy.createController("index");