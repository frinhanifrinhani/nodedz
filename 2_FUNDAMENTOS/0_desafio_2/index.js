const inquirer = require('inquirer')
const chalk = require('chalk')

inquirer
    .prompt([
        {
            name: 'nome',
            message: 'Qual é o nome?'
        },
        {
            name: 'idade',
            message: 'Qual é a idade?'
        }
    ])
    .then((answars) => {
        console.log(chalk.bgYellow.black(`O nome é ${answars.nome} e a idade é ${answars.idade}`))
    })
    .catch(err => console.log(err))
