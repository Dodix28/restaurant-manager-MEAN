import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Jelo = new Schema({
    idJ : {
        type: Number,
    },
  naziv: {
    type: String, 
  },
  slika: {
    type: String, 
  },
  cena: {
    type: Number,
  },
  sastojci: {
    type: Array,
  }
});

export default mongoose.model("JeloModel", Jelo, "jela");