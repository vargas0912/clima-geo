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
                const selectdPlace = places.find( l => l.id === placeId )
                
                console.log( selectdPlace );

                // Buscar datos del clima relacionados a la ciudad seleccionada

                // Mostrar resultados
                console.log('\nInformation City\n'.green);
                console.log('City:', selectdPlace.name);
                console.log('Lat:', selectdPlace.lat);
                console.log('Lng:', selectdPlace.lng);
                console.log('Temperature:', );
                console.log('Min:', );
                console.log('Max:', );
                 

                break;
            case 2:
                console.log(opt);
                break;
        }         

        if (opt !== 0) await pause();

    }while( opt !== 0);
}

main();