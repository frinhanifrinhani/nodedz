// modulos externos
const inquirer = require('inquirer')
const chalk = require('chalk')

// modulos internos
const fs = require('fs')
const { parse } = require('path')

operation()

function operation() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que deseja fazer?',
            choices: [
                'Criar Conta',
                'Consultar Saldo',
                'Depositar',
                'Sacar',
                'Sair'
            ]
        }
    ]).then((anwser) => {
        const action = anwser['action']

        if (action === 'Criar Conta') {
            createAccount()
        }else if(action === 'Consultar Saldo'){

        }else if(action === 'Depositar'){
            deposit()
        }
        else if(action === 'Sacar'){
            
        }else if(action === 'Sair'){
            console.log(chalk.bgBlue('Obrigado por usar o Accounts!'))
            process.exit()
            
        }
    }).catch((err) => console.log(er))
}

function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))
    buildAccount()
}

function buildAccount() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite um nome para sua conta: '
        }
    ])
    .then((anwser) => {
        const accountName = anwser['accountName']

        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }

        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(
                chalk.bgRed.black('Esta conta já existe, escolha outro nome!')
            )
            buildAccount()
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`,'{"balance" : 0}',(err) => console.log(err))

        console.log("Parabéns, a sua conta foi criada!")
        operation()

    })
    .catch((err) => console.log(err))

}

// add an amount to user account
function deposit(){

    inquirer.prompt([
        {
            name: "accountName",
            message: "Qual o nome da sua conta?"
        }
    ])
    .then((anwser) => {
        accountName = anwser['accountName']

        // verify if account exists
        if(!checkoutAccount(accountName)){
           return deposit()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto deseja depositar?'
            }
        ]).then((anwser) => {

            const amount = anwser['amount']

            //add amount
            addAmount(accountName,amount)
            operation()

        }).catch((err) => console.log(err))

    })
    .catch((err) => console.log(err))
}

// verify if account exists
function checkoutAccount(accountName){

    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed('Esta conta não existe, escholha uma conta valida!'))
        return false
    }

    return true
}

function addAmount(accountName, amount){

    const accountData = getAccount(accountName)

    if(!amount){
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'))
        return deposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(`accounts/${accountName}.json`,
    JSON.stringify(accountData),
        function(err) {
            console.log(err)
        }
    )
    console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta`))
}

function getAccount(accountName){
    const accountJson = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r',
    })

    return JSON.parse(accountJson)

}