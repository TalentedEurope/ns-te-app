"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application = require("application");
var nativescript_onesignal_1 = require("nativescript-onesignal");
var applicationSettings = require("application-settings");
function initNotifications() {
    if (application.android) {
        application.on(application.launchEvent, function (args) {
            try {
                nativescript_onesignal_1.TnsOneSignal.startInit(application.android.context).init();
                com.onesignal.OneSignal.idsAvailable(new com.onesignal.OneSignal.IdsAvailableHandler({
                    idsAvailable: function (id, reference) {
                        console.log('OneSignal ID ', id);
                        applicationSettings.setString('onesignal_id', id);
                    }
                }));
            }
            catch (error) {
                console.error('error', error);
            }
        });
    }
}
exports.initNotifications = initNotifications;