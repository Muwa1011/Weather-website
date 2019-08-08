import * as request from 'request';

export class Geocode {

    public geocode = (address, callback) => {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoid2FuamEwODE1IiwiYSI6ImNqeXlkMHJweTBmbnAzbG1tNmp6ODBwaGIifQ.iszulVVU_Ezasgv4NGH2bA&limit=1';
        request({url, json: true}, (error, {body}) => {
            if (error) {
                callback('Unable to connect to location services!', undefined);
            } else if (body.features.length === 0) {
                callback('Location not found', undefined);
            } else {
                callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                });
            }
        });

    };
}