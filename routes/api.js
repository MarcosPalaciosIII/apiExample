const express = require('express');
const router  = express.Router();
const axios = require('axios');
const Pokemon = require('../models/pokemon');


// this route is to grab all the pokemon
router.get('/', (req, res, next) => {
  axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1000"')
  .then(allPokes => {
    // console.log("all the pokes =====>>>>> ", allPokes.data.results);
    //                                              |
    res.render('apiViews/apiHome', {allThePokemon: allPokes.data.results});
  })
  .catch(err => next(err));
});



// this route is for the details of the pokemon
router.get('/poke/:pokeId', (req, res, next) => {

  Pokemon.findOne({pokeId: Number(req.params.pokeId) + 1})
  .then(pokeFromDb => {

    // console.log("the poke from db ========= ", pokeFromDb);
    if(pokeFromDb) {
      data = {
        pokes: pokeFromDb,
        isSaur: true
      };

      if(!pokeFromDb.name.includes('saur')) {
        data.isSaur = false;
      }

      res.render('apiViews/apiDetails', data);
    } else {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${Number(req.params.pokeId) + 1}`)
        .then(responseFromAPI => {
          console.log("><>><<<><><><><><> ", responseFromAPI.data);


          Pokemon.create({
            pokeId: responseFromAPI.data.id,
            name: responseFromAPI.data.name,
            front_default: responseFromAPI.data.sprites.front_default,
            back_default: responseFromAPI.data.sprites.back_default,
            front_shiny: responseFromAPI.data.sprites.front_shiny,
            back_shiny: responseFromAPI.data.sprites.back_shiny
          })
          .then(newPokeInDb => {
            console.log("======== ", newPokeInDb)

            data = {
              pokes: newPokeInDb,
              isSaur: true
            };

            if(!responseFromAPI.data.name.includes('saur')) {
              data.isSaur = false;
            }

            res.render('apiViews/apiDetails', data);
          }).catch(err => next(err));
        }).catch(err => next(err));
    }
  }).catch(err => next(err));

});

module.exports = router;
