import * as request from 'request';

export class Forecast {


    public forecast = (latitude, longitude, callback) => {

        const url = 'https://api.darksky.net/forecast/c6ba443880e52ee6da162b01d5f5d9fc/' + latitude + ',' + longitude + '?units=si&lang=de';
        request({url, json: true}, (error, {body}) => {
            if (error) {
                callback('Unable to connect to weather services!', undefined);
            }else if (body.error) {
                callback('Location not found', undefined);
            } else {
                callback(undefined, {
                    data: ('Jetzt: ' + body.daily.data[0].summary + ' Temperatur: ' + body.currently.temperature + '°C' + ' Regen Wahrscheinlichkeit: ' + body.currently.precipProbability * 100 + '%'),
                    data2: ('Morgen: ' + body.daily.data[1].summary + ' Max/Min Temperatur: '+ body.daily.data[1].temperatureLow + ' - ' + body.daily.data[1].temperatureHigh + '°C.' + ' Regen Wahrscheinlichkeit: ' + body.daily.data[1].precipProbability * 100 + '%'),
                    data3: ('Übermorgen: ' + body.daily.data[2].summary + ' Max/Min Temperatur: '+ body.daily.data[2].temperatureLow + ' - ' + body.daily.data[2].temperatureHigh + '°C.' + ' Regen Wahrscheinlichkeit: ' + body.daily.data[2].precipProbability * 100 + '%')
                })

            }
        });


    }

}