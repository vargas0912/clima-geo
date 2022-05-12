const fs = require('fs');

const axios = require('axios');

class Search {   
    history = [];
    pathDB = './db/database.json';

    constructor(){
        //ToDo: Leer BD si existe
        this.readDB()
;    }

    get capitalizeHistory(){
        //caitalizar 
        return this.history.map( place => {
            let words = place.split(' ');
            words = words.map( w => w[0].toUpperCase() + w.substring(1));

            return words.join(' ');
        });
    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY, //'pk.eyJ1IjoidmFyZ2FzMDkxMiIsImEiOiJjbDJ6bGUzcmwwNTAzM2tyMW5mZ29teXVnIn0.jr6y5GxEtKp737uIKCETUA',
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsOpenWeather(){
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'language': 'en'
        }
    }

    //Test

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

    async climateByPlace( lat, lon ) {
        try {
            //
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: {...this.paramsOpenWeather, lat, lon}
            });

            const resp = await instance.get();

            const {weather, main} = resp.data;
    
            return {
                desc: weather[0].description,
                min: main.temp_min, 
                max: main.temp_max, 
                temp: main.temp
            }; 

        } catch (error) {
            console.log(error);
        }
    }


    addHistory (place = '') {
        //Prevenir duplicados
        if (this.history.includes( place.toLocaleLowerCase())){
            return;
        }

        this.history = this.history.splice(0, 5);

        this.history.unshift( place.toLocaleLowerCase() );

        // save data
        this.saveDB();
    }

    saveDB(){
        const payLoad = {
            history: this.history
        };

        fs.writeFileSync(this.pathDB, JSON.stringify( payLoad ));
    }

    async readDB(){
        // verificar si existe
        const file = this.pathDB;

        if (!fs.existsSync (file)){
            return null;
        }

        //si existe cargar info redfilesync {encoding utf-8}
        const info = fs.readFileSync ( file, { encoding: 'utf-8'} );
    
        const data = JSON.parse( info );        
        this.history = data.history;
        
        
    }
}


module.exports = Search;  