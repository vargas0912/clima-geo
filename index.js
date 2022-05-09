const { 
    inquirerMenu,
    pause, 
    readInput
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

                await search.city( query );                 

                //Buscar los lugares

                // Usuario selecciona el lugar buscado

                // Buscar datos del clima relacionados a la ciudad seleccionada

                // Mostrar resultados
                console.log('\nInformation City\n'.green);
                console.log('City:', );
                console.log('Lat:', );
                console.log('Lng:', );
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