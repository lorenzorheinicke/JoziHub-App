function Controller() {
    function parseRESTFBLogin(callback) {
        var client = Ti.Network.createHTTPClient({
            timeout: 5e3
        });
        client.onload = function() {
            Ti.API.info("onload: " + this.responseText);
            Ti.API.info("status: " + this.status + "\nstatustext: " + this.statusText);
            Ti.API.info("parse.currentUser: " + JSON.stringify(myApp.parse.currentUser));
            console.log("callback: " + typeof callback);
            if ("undefined" == typeof callback) {
                alert("hello");
                return;
            }
            callback();
        };
        client.onerror = function(e) {
            Ti.API.info("onerror: " + JSON.strinigfy(e));
        };
        client.open("POST", "https://api.parse.com/1/users");
        var authData = {
            authData: {
                facebook: {
                    id: myApp.facebook.uid,
                    access_token: myApp.facebook.accessToken,
                    expiration_date: myApp.facebook.expirationDate
                }
            }
        };
        client.setRequestHeader("X-Parse-Application-Id", "5J3HfUVCwzRgCLSNYI86fLmSLowAxKJhiBj2xqWO");
        client.setRequestHeader("X-Parse-REST-API-Key", "cskMYRCr6TCdRWfYL1PFHmzA4yYTTluAipAz2w2F");
        client.setRequestHeader("Content-Type", "application/json");
        client.send(JSON.stringify(authData));
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.__alloyId0 = Ti.UI.createWindow({
        title: "JoziHub Login",
        fullscreen: "true",
        id: "__alloyId0"
    });
    $.__views.__alloyId1 = Ti.UI.createView({
        backgroundColor: "#86c7a8",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        id: "__alloyId1"
    });
    $.__views.__alloyId0.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        text: "Login",
        id: "__alloyId2"
    });
    $.__views.__alloyId1.add($.__views.__alloyId2);
    $.__views.fbButton = Alloy.Globals.Facebook.createLoginButton({
        id: "fbButton",
        ns: "Alloy.Globals.Facebook"
    });
    $.__views.__alloyId1.add($.__views.fbButton);
    $.__views.login = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.__alloyId0,
        id: "login"
    });
    $.__views.login && $.addTopLevelView($.__views.login);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.fbButton.style = myApp.facebook.BUTTON_STYLE_WIDE;
    Ti.API.info("Login screen...");
    myApp.facebook.addEventListener("login", function(e) {
        Ti.API.info("login event: " + JSON.stringify(e));
        e.success ? parseRESTFBLogin() : e.error ? alert(e.error) : e.cancelled && alert("Cancelled");
    });
    $.login.addEventListener("app:closelogin", function() {
        $.login.close();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;