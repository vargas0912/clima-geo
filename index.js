require('dotenv').config();

const { 
    inquirerMenu,
    pause, 
    readInput,
    listPlaces
} = require("./helpers/inquirer");


const Search = require("./models/search");

const main = async() => {

    const search = new Search();

    let opt = 0;

    do {                    
        opt = await inquirerMenu(); 

        switch (opt) {
            case 1:

                //mostrar mensaje 
                const  query = await readInput('City: ');

                
                //Buscar los lugares
                const places = await search.city( query );   

                
                // Usuario selecciona el lugar buscado
                const placeId = await listPlaces(places );

                if (placeId === 0) continue;
                                
                const selectdPlace = places.find( l => l.id === placeId )
                
                //Save history
                search.addHistory(selectdPlace.name);
                //console.log( selectdPlace );

                // Buscar datos del clima relacionados a la ciudad seleccionada
                const climate = await search.climateByPlace(selectdPlace.lat, selectdPlace.lng);
                                
                // Mostrar resultados
                console.clear();
                console.log('\nInformation City\n'.green);
                console.log('City:', selectdPlace.name.green);
                console.log('Lat:', selectdPlace.lat);
                console.log('Lng:', selectdPlace.lng);
                console.log('Temperature:', climate.temp);
                console.log('Min:', climate.min);
                console.log('Max:', climate.max);
                console.log('Conditions: ', climate.desc.green);
                 

                break;
            case 2:
                // search.history.forEach( (place, i) => {
                search.capitalizeHistory.forEach( (place, i) => {
                    const idx = `${ i + 1 }.`.green;

                    console.log(`${ idx } ${ place }`);

                })
                break;
        }         

        if (opt !== 0) await pause();

    }while( opt !== 0);
}

main();