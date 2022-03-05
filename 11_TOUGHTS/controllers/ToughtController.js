const session = require('express-session')
const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtController{

    static async showTought(req, res){

        res.render('toughts/home')

    }

    static async dashboard(req,res){
        res.render('toughts/dashboard')
    }

    static createToughts(req,res){
        res.render('toughts/create')
    }

    static async createToughtsSave(req,res){

        const tought = {
            title: req.body.title,
            UserId: req.session.userid
        }

        try {
            
            await Tought.create(tought)

            req.flash('message','Pensamento criado com sucesso')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })

        } catch (error) {
            console.log(error)
        }
    }
}