const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pokemonSchema = new Schema(
  // 1st argument -> SCHEMA STRUCTURE
  {

    pokeId: { type: String },
    name: { type: String },
    front_default: { type: String },
    back_default: { type: String },
    front_shiny: { type: String },
    back_shiny: { type: String },
  },
    {
    // automatically add "createdAt" and "updateAt" Date fields
    timestamps: true
    }
);



const PokeModel = mongoose.model("Poke", pokemonSchema);

module.exports = PokeModel;
