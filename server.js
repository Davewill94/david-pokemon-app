require('dotenv').config();
const express = require('express');
const app = express();
//const pokemon = require('./models/pokemon');
const methodOverride = require('method-override');
const routes = require('./routes');

//middle ware
app.use(express.urlencoded({extended: true}));
//adding override library to middle ware
app.use(methodOverride('_method'));
app.use('/pokemon', routes.pokemon);
app.use('/player', routes.player);

//BONUS - css
app.use(express.static('public'));

app.listen(process.env.PORT, () => {
    //console.log('I am listening on 3001');
});