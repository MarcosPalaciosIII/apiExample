const express = require('express');
const router  = express.Router();
const axios = require('axios');
const pokemon = require("../models/pokemon")


/* GET home page */
router.get('/', (req, res, next) => {
  axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1000").then(allPokes =>{
    console.log("all the pokes ======>>>>>", allPokes.data.results)
    res.render("apiViews/apiHome", {allPokes: allPokes.data.results})
  })
  .catch(err => next(err))
});

router.get('/poke/:pokeId', (req, res, next) => {
 
  pokemon.findOne({pokeId: Number(req.params.pokeId)+1}).then(pokeFromDB =>{
console.log("==========>>>>>>>>>", responseFromAPI.data)
  
if(pokeFromDB){
  data = {
    pokes: responseFromAPI.data,
    isSaur: true
  };
  if (!responseFromAPI.data.name.includes('saur')) {
    data.isSaur = false;
  }

  res.render("apiViews/apiDetails", data)
}else{

  axios.get(`https://pokeapi.co/api/v2/pokemon/${Number(req.params.pokeId) + 1}`)
  .then(responseFromAPI => {
    console.log("><>><<<><><><><><> ", responseFromAPI.data);

    pokemon.create({
      pokeId: responseFromAPI.data.id,
      name: responseFromAPI.data.name
    })

    data = {
      pokes: responseFromAPI.data,
      isSaur: true
    };

    if(!responseFromAPI.data.name.includes('saur')) {
      data.isSaur = false;
    }

    res.render('apiViews/apiDetails', data);
  }).catch(err => next(err));
}
}).catch(err => next(err))
});

module.exports = router;
