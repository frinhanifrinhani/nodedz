const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
})

readline.question("Qual a sua linguagem preferida? ", (language) => {

    if(language === 'Python'){
        console.log('Python não é legal')
    }else{
        console.log(`Minha linguagem preferida é: ${language}`)
    }

    readline.close()

})