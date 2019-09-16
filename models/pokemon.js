const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const pokemonSchema = new Schema(
  // 1st argument -> SCHEMA STRUCTURE
  {
    pokeId: { type: String },
    name: { type: String },
    frontSpriteImage: { type: String },
    backSpriteImage: { type: String }
  },
  {
    // automatically add "createdAt" and "updateAt" Date fields
    timestamps: true
  }
);
const PokeModel = mongoose.model("Poke", pokemonSchema);
module.exports = PokeModel;