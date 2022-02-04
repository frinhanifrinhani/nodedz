const express = require('express')
const exphbs = require('express-handlebars')

const router = express.Router()

router.use(express.static('public'))

function getCourses(){
    const courses = [
        {
            id: '1',
            title: 'Node.js do Zero a Maestria com diversos Projetos',
            category: 'JavaScript',
            teacher: 'Matheus Battisti',
            ratingNumber: '4,8',
            price: '96,90',
            description: 'Crie aplicações completas com Node.js, Express, MongoDB, MySQL, React.js, arquitetura MVC e muito mais!'         
        },
        {
            id: '2',
            title: 'PHP do Zero a Maestria + 4 Projetos incríveis',
            category: 'PHP',
            teacher: 'Matheus Battisti',
            ratingNumber: '4,8',
            price: '84,90',
            description: 'Aprenda tudo o que você precisa para ser um programador profissional em PHP, criando projetos e com exercícios práticos'         
        },
        {
            id: '3',
            title: 'HTML e CSS: O Início (incluindo 5 Projetos)',
            category: 'Web Design',
            teacher: 'Matheus Battisti',
            ratingNumber: '4,7',
            price: '39,90',
            description: 'Inicie no mundo da programação web com HTML e CSS, e ainda crie os seus primeiros projetos e sites.'         
        },   
        {
            id: '4',
            title: 'Git e GitHub do básico ao avançado (c/ gist e GitHub Pages)',
            category: 'Versionamento',
            teacher: 'Matheus Battisti',
            ratingNumber: '4,8',
            price: '54,90',
            description: 'Aprenda do básico ao avançado Git e GitHub, uma abordagem prática para o controle de versão e manutenção de repositórios'         
        },
        {
            id: '5',
            title: 'SQL do básico ao avançado (com MySQL e Projeto)',
            category: 'Banco de Dados',
            teacher: 'Matheus Battisti',
            ratingNumber: '4,7',
            price: '69,90',
            description: 'Aprenda tudo sobre SQL e MySQL de forma prática e objetiva, e ainda crie projetos com PHP e MySQL!'         
        }          
        
    ]

    return courses;
}

router.get('/:id', (req, res) => {

    const id = req.params.id;

    const courses = getCourses()
    const course = courses.find(object => object.id === `${id}`)
    
    res.render('course/course', {course})
})

router.get('/',(req,res) => {

    res.render('course/courses', {courses: getCourses()})
})

module.exports = router