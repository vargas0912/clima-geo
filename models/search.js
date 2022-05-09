 const axios = require('axios');

class Search {
    history = ['Tegucigalpa', 'Madrid', 'San Jose'];


    constructor(){
        //ToDo: Leer BD si existe

    }

    async city(query = '' ){
        //peticion http:

        console.log('Ciudad: ' + query);


        return []; //Retornar ciudades que coincidan con el query
    }
}


module.exports = Search;