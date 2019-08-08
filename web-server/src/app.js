"use strict";
exports.__esModule = true;
var path = require("path");
var express = require("express");
var hbs = require("hbs");
var geocode_1 = require("./utils/geocode");
var forecast_1 = require("./utils/forecast");
var main = /** @class */ (function () {
    function main() {
        var _this = this;
        this.geocode = new geocode_1.Geocode();
        this.forecast = new forecast_1.Forecast();
        var app = express();
        //Define paths for express config
        var publicDirectoryPath = path.join(__dirname, '../public');
        var viewsPath = path.join(__dirname, '../templates/views');
        var partialsPath = path.join(__dirname, '../templates/partials');
        //Setup handlebars engine and views location
        app.set('view engine', 'hbs');
        app.set('views', viewsPath);
        hbs.registerPartials(partialsPath);
        //Setup static directory to serve
        app.use(express.static(publicDirectoryPath));
        app.get('', function (req, res) {
            res.render('index', {
                title: 'Weather App',
                name: 'Wanja Münch'
            });
        });
        app.get('/about', function (req, res) {
            res.render('about', {
                title: 'About Me',
                name: 'Wanja Münch'
            });
        });
        app.get('/help', function (req, res) {
            res.render('help', {
                msg: 'you dont deserve help thank you',
                title: 'Help',
                name: 'Wanja Münch'
            });
        });
        app.get('/weather', function (req, res) {
            if (!req.query.address) {
                return res.send({
                    error: 'You must provide an address'
                });
            }
            _this.geocode.geocode(req.query.address, function (error, _a) {
                var _b = _a === void 0 ? { latitude: undefined, longitude: undefined, location: undefined } : _a, _c = _b.latitude, latitude = _c === void 0 ? '' : _c, longitude = _b.longitude, location = _b.location;
                if (error) {
                    return res.send({ error: error });
                }
                _this.forecast.forecast(latitude, longitude, function (error, forecastData) {
                    if (error) {
                        return res.send({ error: error });
                    }
                    res.send({
                        location: location,
                        forecastData: forecastData,
                        address: req.query.address
                    });
                });
            });
        });
        app.get('/products', function (req, res) {
            if (!req.query.search) {
                return res.send({
                    error: 'You must provide a search term'
                });
            }
            console.log(req.query);
            res.send({
                products: []
            });
        });
        app.get('/help/*', function (req, res) {
            res.render('404page', {
                title: '404',
                msg: 'Help article not found.',
                name: 'Wanja Münch'
            });
        });
        app.get('*', function (req, res) {
            res.render('404page', {
                title: '404',
                msg: 'Page not found.',
                name: 'Wanja Münch'
            });
        });
        app.listen(3000, function () {
            console.log('Server is up on port 3000');
        });
    }
    return main;
}());
exports.main = main;
var a = new main();
