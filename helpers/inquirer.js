const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want?',
        choices: [
            {
                value: 1,
                name: `${ '1.'.yellow } Search city.`
            },
            {
                value: 2,
                name: `${ '2.'.yellow } History.`            
            },
            {
                value: 0,
                name: `${ '0.'.yellow } Exit.`
            }
        ]
    }
]; 

const msgOutput = [
    {
        type: 'input',
        name: 'pause',
        message: `\nPress ${ 'ENTER'.yellow } for continue`,
        // choices:[{value: 0, name: 'Continue...'}]
    }
];

const inquirerMenu = async() => {    
    console.clear();
    console.log("===============================".green);
    console.log("       Select an option ".yellow);
    console.log("===============================\n".green);

    const { option } = await inquirer.prompt(questions);

    return option;
}

const pause = async() => {
    const { pause } = await inquirer.prompt(msgOutput);

    return pause;
};

const readInput = async ( message ) => {
    const question =  [
        {
            type: 'input',
            name: 'desc',
            message,
            validate ( value ) {
                if (value.length === 0) {
                    return 'Please, write a value.';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);

    return desc;
};

const listTasksForDelete = async ( tasks = [] ) => {
    
    const  choices = tasks.map( (task, i) => {
        const idx = `${ i + 1}.`.green;

        return {
            value: task.id,
            name: `${ idx } ${ task.desc}`
        };
     });

     choices.unshift({
        value: 0,
        name: '0.'.green + ' Escape.'
     });

     const questions = [
         {
             type: 'list',
             name: 'id', 
             message: 'Delete',
             choices
         }
     ]
 
    const { id } = await inquirer.prompt(questions);
    return id;
}

const confirmDeleteTask = async ( message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok', 
            message
        }
    ];

    const { ok } = await inquirer.prompt( question );

    return ok;
}



const listTasksForComplete = async ( tasks = [] ) => {
    
    const  choices = tasks.map( (task, i) => {
        const idx = `${ i + 1}.`.green;

        return {
            value: task.id,
            name: `${ idx } ${ task.desc}`,
            checked: ( task.finishOn ) ? true : false
        };
     });


     const question = [
         {
             type: 'checkbox',
             name: 'ids', 
             message: 'Selected',
             choices
         }
     ]
 
    const { ids } = await inquirer.prompt(question);
    return ids;
}

module.exports = { 
    inquirerMenu,
    pause, 
    readInput, 
    listTasksForDelete,
    confirmDeleteTask,
    listTasksForComplete    
}  