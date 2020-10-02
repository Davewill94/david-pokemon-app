const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');


router.get('/', ctrl.player.renderHomePage);
router.get('/signUp', ctrl.player.renderSignUp);
router.get('/login', ctrl.player.renderLogin);
router.get('/profilePage/:index', ctrl.player.renderPlayer);

router.post('/new', ctrl.player.createPlayer);
router.post('/checkuser', ctrl.player.checkUser);

router.put('/profilePage/:index', ctrl.player.editPlayer);

router.delete('/profilePage/:playerId/:pokemonId', ctrl.player.removePlayerPokemon);
router.delete('/profilePage/:index', ctrl.player.deletePlayer);

module.exports = router;