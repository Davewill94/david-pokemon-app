// const player = require('../models/player');
const Player = require('../models').Player;
const Team = require('../models').Team;
const Pokemon = require('../models').Pokemon;
const PlayerPokemon = require('../models').PlayerPokemon;
//no change
const renderHomePage = (req, res) => {
    res.render('player/homepage.ejs')
};
//no change
const renderSignUp = (req, res) => {
    res.render('player/signUp.ejs');
}
//working
const createPlayer = (req, res) => {
    Player.create(req.body)
    .then(newPlayer =>{
        res.redirect(`/player/profilePage/${newPlayer.id}`);        
    })
};
//working
const renderPlayer = (req, res) => {
    Player.findByPk(req.params.index, {
        include: [Team,
        {
            model: Pokemon,
            attributes: ['id','name']
        }],
    })
    .then(playerProfile =>{
        Team.findAll()
        .then(allTeams => {
            Pokemon.findAll()
            .then(allPokemon => {
                res.render('player/profilePage.ejs', {
                    player: playerProfile,
                    teams: allTeams,
                    pokemon: allPokemon
                })  
            })
        })
    })
};
//no change
const renderLogin = (req, res) => {
    res.render('player/logIn.ejs')
}
//working
const checkUser = (req, res) => {
    Player.findOne({
        where: {username: req.body.username,
                password: req.body.password}
    })
    .then(foundPlayer => {
        res.redirect(`profilePage/${foundPlayer.id}`)        
    })
}
//working 
const editPlayer = (req, res) => {
    Player.update(req.body, {
        where: {id: req.params.index},
        returning: true
    })
    .then(updatedPlayer => {
        Player.findByPk(req.params.index)
        .then(foundPlayer => {
            Pokemon.findByPk(req.body.pokemonId)
            .then(foundPokemon => {
                foundPokemon.addPlayer(foundPlayer)
                res.redirect(`/player/profilePage/${req.params.index}`);
            })
        })

    }) 
}
//working
const deletePlayer = (req, res) => {
    Player.destroy({
        where: {id: req.params.index}
    })
    .then(()=>{
        res.redirect('/player');        
    })
}

const removePlayerPokemon = (req, res) => {
    console.log(req.params)
    PlayerPokemon.destroy({
        where: {playerId: req.params.playerId,
                pokemonId: req.params.pokemonId
        }
    })
    .then(() => {
    res.redirect(`/player/profilePage/${req.params.playerId}`);
    })
}

module.exports = {
    renderHomePage,
    renderSignUp,
    createPlayer,
    renderPlayer,
    renderLogin,
    checkUser,
    editPlayer,
    deletePlayer,
    removePlayerPokemon
};