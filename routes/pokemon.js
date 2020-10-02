const express = require('express');
const router = express.Router();

const controller = require('../controllers');

router.get('/', controller.pokemon.mainPage);
router.get('/new', controller.pokemon.renderNew);
router.get('/random', controller.pokemon.getRandom);
router.get('/:index', controller.pokemon.renderPokemon);
router.get('/:index/edit', controller.pokemon.renderEdit);



router.post('/', controller.pokemon.createNew);
router.put('/:index', controller.pokemon.createEdit);
router.delete('/:index', controller.pokemon.deletePokemon);

module.exports = router;