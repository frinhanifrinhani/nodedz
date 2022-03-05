const express = require('express')
const router = express.Router()
const ToughtController = require('../controllers/ToughtController')

// helpers
const checkAuth = require('../helpers/auth').checkAuth

router.get('/add', checkAuth,ToughtController.createToughts)
router.post('/add', checkAuth,ToughtController.createToughtsSave)
router.get('/dashboard', checkAuth,ToughtController.dashboard)
router.post('/remove', checkAuth,ToughtController.removeTought)
router.get('/', ToughtController.showTought)

module.exports = router
