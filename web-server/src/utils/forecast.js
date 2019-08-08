"use strict";
exports.__esModule = true;
var request = require("request");
var Forecast = /** @class */ (function () {
    function Forecast() {
        this.forecast = function (latitude, longitude, callback) {
            var url = 'https://api.darksky.net/forecast/c6ba443880e52ee6da162b01d5f5d9fc/' + latitude + ',' + longitude + '?units=si&lang=de';
            request({ url: url, json: true }, function (error, _a) {
                var body = _a.body;
                if (error) {
                    callback('Unable to connect to weather services!', undefined);
                }
                else if (body.error) {
                    callback('Location not found', undefined);
                }
                else {
                    callback(undefined, {
                        data: (body.daily.data[0].summary + ' Temperatur: ' + body.currently.temperature + '°C' + ' Regen Wahrscheinlichkeit: ' + body.currently.precipProbability * 100 + '%')
                    });
                }
            });
        };
    }
    return Forecast;
}());
exports.Forecast = Forecast;
