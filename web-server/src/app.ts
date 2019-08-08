import * as path from 'path';
import * as express from 'express';
import * as hbs from 'hbs'
import {Geocode} from './utils/geocode';
import {Forecast} from './utils/forecast';

export class main {

    private geocode: Geocode = new Geocode();
    private forecast: Forecast = new Forecast();

    constructor() {

        const app = express();
        const port = process.env.PORT || 3000

//Define paths for express config
        const publicDirectoryPath = path.join(__dirname, '../public');
        const viewsPath = path.join(__dirname, '../templates/views');
        const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
        app.set('view engine', 'hbs');
        app.set('views', viewsPath);
        hbs.registerPartials(partialsPath);

//Setup static directory to serve
        app.use(express.static(publicDirectoryPath));

        app.get('', (req, res) => {
            res.render('index', {
                title: 'Weather App',
                name: 'Wanja Münch'
            })
        });

        app.get('/about', (req, res) => {
            res.render('about', {
                title: 'About Me',
                name: 'Wanja Münch'
            });
        });

        app.get('/help', (req, res) => {
            res.render('help', {
                msg: 'you dont deserve help thank you',
                title: 'Help',
                name: 'Wanja Münch'
            });
        });


        app.get('/weather', (req, res) => {

            if (!req.query.address) {
                return res.send({
                    error: 'You must provide an address'
                })
            }

            this.geocode.geocode(req.query.address, (error, {latitude = '', longitude, location} = {
                latitude: undefined,
                longitude: undefined,
                location: undefined
            }) => {

                if (error) {
                    return res.send({error});
                }

                this.forecast.forecast(latitude, longitude, (error, forecastData) => {
                    if (error) {
                        return res.send({error});
                    }
                    res.send({
                        location: location,
                        forecastData: forecastData,
                        address: req.query.address
                    });

                });

            });

        });

        app.get('/products', (req, res) => {
            if (!req.query.search) {
                return res.send({
                    error: 'You must provide a search term'
                })
            }

            console.log(req.query);
            res.send({
                products: []
            })
        });

        app.get('/help/*', (req, res) => {
            res.render('404page', {
                title: '404',
                msg: 'Help article not found.',
                name: 'Wanja Münch'
            })

        });

        app.get('*', (req, res) => {
            res.render('404page', {
                title: '404',
                msg: 'Page not found.',
                name: 'Wanja Münch'
            })
        });

        app.listen(port, () => {
            console.log('Server is up on port ' + port)
        });

    }

}

const a = new main();