const express = require('express');
const axios = require('axios').default;

// const pokemon = require('../models/pokemon');
const Pokemon = require('../models').Pokemon;
const Player = require('../models').Player;

//working
const mainPage = (req, res) => {
    Pokemon.findAll({

        })
        .then(pokemon =>{
                res.render('index.ejs', {
                pokemon: pokemon,  
            })
        })
    };
//working
const renderPokemon = (req, res) => {
    Pokemon.findByPk(req.params.index, {
        include: [{
            model: Player,
            attributes: ['name']
        }]
    })
    .then(pokemon => {
        res.render('show.ejs', {
            pokemon: pokemon
        });
    })
};
//no change needed
const renderNew = (req, res) => {
    res.render('new.ejs');
};
//working
const createNew = (req, res) => {
    Pokemon.create(req.body)
    .then(newPokemon => {
        res.redirect('/pokemon');
    })
}
//working
const renderEdit = (req, res) => {

    Pokemon.findByPk(req.params.index)
    .then(pokemon => {
            res.render('edit.ejs', {
            pokemon: pokemon
        });
    })
}
//working
const createEdit = (req, res) => {
    Pokemon.update(req.body, {
        where: {id: req.params.index},
        returning: true
    })
    .then(updatedPokemon =>{
        res.redirect(`/pokemon/${req.params.index}`)
    })
}
//working
const deletePokemon = (req, res) => {
    Pokemon.destroy({
        where: {id: req.params.index}
    })
    .then(() => {
        res.redirect('/pokemon');
    })
}
const getRandom = (req, res) => {
        const randomNum = Math.floor(Math.random()*151 + 1);
        const endPoint = `https://pokeapi.co/api/v2/pokemon/${randomNum}/`;
        axios({url: endPoint, method: 'get'})
        .then((response) => {

            res.render('random.ejs', {
                randomName: response.data,
            });
        })
        .catch((err) => {
            console.log(err)
        })
}


module.exports = {
    mainPage,
    renderPokemon,
    renderNew,
    createNew,
    renderEdit,
    createEdit,
    deletePokemon,
    getRandom

};