"use strict";
exports.__esModule = true;
var request = require("request");
var Geocode = /** @class */ (function () {
    function Geocode() {
        this.geocode = function (address, callback) {
            var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoid2FuamEwODE1IiwiYSI6ImNqeXlkMHJweTBmbnAzbG1tNmp6ODBwaGIifQ.iszulVVU_Ezasgv4NGH2bA&limit=1';
            request({ url: url, json: true }, function (error, _a) {
                var body = _a.body;
                if (error) {
                    callback('Unable to connect to location services!', undefined);
                }
                else if (body.features.length === 0) {
                    callback('Location not found', undefined);
                }
                else {
                    callback(undefined, {
                        latitude: body.features[0].center[1],
                        longitude: body.features[0].center[0],
                        location: body.features[0].place_name
                    });
                }
            });
        };
    }
    return Geocode;
}());
exports.Geocode = Geocode;
