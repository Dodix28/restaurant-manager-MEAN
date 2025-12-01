import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Restoran = new Schema({
  naziv: {
    type: String, 
  },
  adresa: {
    type: String, 
  },
  opis: {
    type: String, 
  },
  tip: {
    type: String,
  },
  konobari: {
    type: Array,
  },
  idR : {
    type: Number, required: true
  },
  kontakt: {
    type: String,
  } ,
  jelovnik: {
    type: Array,
  },
  idRaspored: {
    type: Number
  }
},{ versionKey: false });

export default mongoose.model("RestoranModel", Restoran, "restorani");
