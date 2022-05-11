const axios = require('axios');

class Search {
    history = ['Tegucigalpa', 'Madrid', 'San Jose'];


    constructor(){
        //ToDo: Leer BD si existe

    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY, //'pk.eyJ1IjoidmFyZ2FzMDkxMiIsImEiOiJjbDJ6bGUzcmwwNTAzM2tyMW5mZ29teXVnIn0.jr6y5GxEtKp737uIKCETUA',
            'limit': 5,
            'language': 'es'
        }
    }

    async city(query = '' ){
        //peticion http:
        try {            
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
                params: this.paramsMapbox
            });
    
            const resp = await instance.get();
    
            return resp.data.features.map( place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }) ); 
    
            

        } catch (error) {
            return [];
        }
    }
}


module.exports = Search;  