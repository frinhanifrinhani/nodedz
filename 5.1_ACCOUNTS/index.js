// modulos externos
const inquirer = require('inquirer');
const chalk = require('chalk');

// modulos internos
const fs = require('fs')

operations()

function operations() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'O que você deseja fazer?',
                choices: [
                    'Criar Conta',
                    'Consultar Saldo',
                    'Depositar',
                    'Sacar',
                    'Transferir',
                    'Sair'
                ]
            }
        ])
        .then((answare) => {
            const action = answare['action']

            if (action === 'Criar Conta') {
                createAccount()
            } else if (action === 'Depositar') {
                deposit()
            } else if (action === 'Consultar Saldo') {
                getAccountBalance()
            } else if (action === 'Sacar') {
                withdraw()
            } else if (action === 'Transferir') {
                amountTransfer()
            }
            else if (action === 'Sair') {
                console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
                process.exit()
            }

        })
        .catch((erro) => console.log(err))

}

// create account
function createAccount() {
    console.log(chalk.bgGreen.black("Parabéns por escolher o nosso banco!"))
    console.log(chalk.green("Defina as opções da sua conta a seguir"))

    buildAccount()
}

function buildAccount() {
    inquirer
        .prompt([
            {
                name: 'accountName',
                message: 'Digite um nome para sua conta: '
            }
        ])
        .then((answare) => {
            const accountName = answare['accountName']

            console.log(accountName)

            if (!fs.existsSync('accounts')) {
                fs.mkdirSync('accounts')
            }

            if (fs.existsSync(`accounts/${accountName}.json`)) {
                console.log(chalk.bgRed.black('Esta conta já existe, escolha outro nome!'))
                buildAccount()
                return
            }

            fs.writeFileSync(
                `accounts/${accountName}.json`,
                '{"balance": 0, "special": 0}',
                (err) => console.log(err)
            )

            console.log(chalk.green('Parabéns, a sua conta foi criada!'))
            operations()

        })
        .catch((err) => console.log(err))
}

function deposit() {
    inquirer
        .prompt([
            {
                name: 'accountName',
                message: 'Informe sua conta? '
            }
        ])
        .then((answare) => {

            const accountName = answare['accountName']

            if (!checkAccount(accountName)) {
                return deposit()
            }

            inquirer.prompt([
                {
                    name: 'amount',
                    message: 'Quanto você deseja depositar? '
                }
            ])
                .then((answare) => {

                    const amount = answare['amount']

                    addAmount(accountName, amount)

                    operations()

                })
                .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
}

function checkAccount(accountName) {

    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Esta conta não existe, informa o nome correto!'))
        return false
    }

    return true
}

function addAmount(accountName, amount) {

    const accountData = getAccount(accountName)

    if (!amount) {
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'))
        return deposit()
    }

    accountData.balance = parseFloat(accountData.balance) + parseFloat(amount)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        (err) => console.log(err)
    )

    console.log(chalk.green(`Foi depositado o valor de R$ ${amount} na sua conta ${accountName}`))
}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)
}

function getAccountBalance() {

    inquirer
        .prompt([
            {
                name: 'accountName',
                message: 'Informe sua conta: '
            }
        ])
        .then((answare) => {
            const accountName = answare['accountName']

            if (!checkAccount(accountName)) {
                return getAccountBalance()
            }
            const accountData = getAccount(accountName)

            console.log(chalk.green('O saldo da sua conta é '))
            console.log(chalk.green(`Saldo R$ ${accountData.balance}`))
            console.log(chalk.green(`Especial R$ ${accountData.special}`))
            operations()

        })
        .catch((err) => console.log(err))
}

function withdraw() {
    inquirer
        .prompt([
            {
                name: 'accountName',
                message: 'Informe sua conta: '
            }
        ])
        .then((answare) => {
            const accountName = answare['accountName']

            if (!checkAccount(accountName)) {
                return withdraw()
            }

            inquirer
                .prompt([
                    {
                        name: 'amount',
                        message: 'Quanto deseja sacar? '
                    }
                ])
                .then((answare) => {
                    amount = answare['amount']

                    removeAmount(accountName, amount)

                })
                .catch((err) => console.log(err))


        })
        .catch((err) => console.log(err))
}

function removeAmount(accountName, amount) {

    const accountData = getAccount(accountName)

    const balance = accountData.balance
    const special = accountData.special

    const availableValue = parseFloat(balance) + parseFloat(special)

    if (!amount) {
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'))
        return withdraw()
    }

    if (availableValue < amount) {
        console.log(chalk.bgRed.black('Valor indisponivel!'))
        return withdraw()
    }

    if (balance < amount && amount <= availableValue) {
        withdrawSpecial(accountName, accountData, amount)
        return
    }

    writeFileRemoveAmount(accountName, accountData, amount)

    console.log(chalk.green(`Foi realizado o saque de R$ ${amount} da sua conta!`))

    operations()

}

function withdrawSpecial(accountName, accountData, amount) {

    console.log(chalk.bgRed.black('Esse valor irá utilizar o especial!'))
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'withdrawSpecial',
                message: 'Deseja continual?',
                choices: [
                    'Sim',
                    'Não'
                ]
            }
        ])
        .then((answare) => {
            const withdrawSpecial = answare['withdrawSpecial']

            if (withdrawSpecial === 'Não') {
                operations()
            }

            if (withdrawSpecial === 'Sim') {

                writeFileRemoveAmount(accountName, accountData, amount)

                console.log(chalk.green(`Foi realizado o saque de R$ ${amount} da sua conta`))
                console.log(chalk.red(`ATENÇÃO: Foi utililzado o especial`))

                return operations()
            }
        }
        )
        .catch((err) => console.log(err))

}

function writeFileRemoveAmount(accountName, accountData, amount) {
    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        (err) => console.log(err)
    )
}

function amountTransfer() {

    inquirer
        .prompt([
            {
                name: 'accountName',
                message: 'Informe sua conta'
            }
        ])
        .then((answare) => {

            const accountName = answare['accountName']

            if (!checkAccount(accountName)) {
                return amountTransfer()
            }

            inquirer
                .prompt([
                    {
                        name: 'amountToTransfer',
                        message: 'Informe o valor a ser transferido: '
                    }
                ])
                .then((answare) => {

                    const amountToTransfer = answare['amountToTransfer']

                    const accountData = getAccount(accountName)

                    const balance = accountData.balance
                    const special = accountData.special

                    const availableValue = parseFloat(balance) + parseFloat(special)

                    if (availableValue < amountToTransfer) {
                        console.log(chalk.bgRed.black('Valor indisponivel!'))
                        return amountTransfer()

                    }

                    if (balance < amountToTransfer && amountToTransfer <= availableValue) {
                        transferSpecial(accountName, accountData, amountToTransfer)
                        return
                    }

                    transfer(accountName, accountData, amountToTransfer,false)
                    return


                })
                .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
}

function transferSpecial(accountName, accountData, amountToTransfer) {

    console.log(chalk.bgRed.black('Esse valor irá utilizar o especial!'))

    inquirer
        .prompt([
            {
                type: 'list',
                name: 'transferSpecial',
                message: 'Deseja continual?',
                choices: [
                    'Sim',
                    'Não'
                ]
            }
        ])
        .then((answare) => {

            const transferSpecial = answare['transferSpecial']

            if (transferSpecial === 'Não') {
                operations()
            }

            if (transferSpecial === 'Sim') {
                
                transfer(accountName, accountData, amountToTransfer, true)
                
            }
        }
        )
        .catch((err) => console.log(err))
        return

}


function transfer(accountName, accountData, amountToTransfer, special) {
    inquirer
        .prompt([
            {
                name: 'accountNameToTransfer',
                message: 'Informe a conta para onde será feita a transferência: '
            }
        ])
        .then((answare) => {
            const accountNameToTransfer = answare['accountNameToTransfer']

            if (!checkAccount(accountNameToTransfer)) {
                return amountTransfer()
            }

            const toTransferObj = {
                'accountName': accountName,
                'accountData': accountData,
                'accountNameToTransfer': accountNameToTransfer,
                'amountToTransfer': amountToTransfer,
                'special': special
                
            }

            writeFileRemoveTransferAmount(toTransferObj)

            return operations()
        })
        .catch((err) => console.log(err))
        return
}


function writeFileRemoveTransferAmount(toTransferObj) {

    const accountName = toTransferObj.accountName
    const accountData = toTransferObj.accountData
    const accountNameToTransfer = toTransferObj.accountNameToTransfer
    const amountToTransfer = toTransferObj.amountToTransfer

    const accountDataToTransfer = getAccount(accountNameToTransfer)

    accountDataToTransfer.balance = parseFloat(accountDataToTransfer.balance) + parseFloat(amountToTransfer);

    writeFileRemoveAmount(accountName, accountData, amountToTransfer)

    fs.writeFileSync(
        `accounts/${accountNameToTransfer}.json`,
        JSON.stringify(accountDataToTransfer),
        (err) => console.log(err)
    )

    console.log(chalk.green(`Foi realizada a transferência de R$ ${amountToTransfer} para a conta ${accountNameToTransfer}`))

    if(toTransferObj.special){
        console.log(chalk.red(`ATENÇÃO: Foi utililzado o especial`))
    }
    

}