import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Rezervacija = new Schema({
  datum: {
    type: String, 
  },
  vreme: {
    type: String, 
  },
  brOsoba: {
    type: Number, 
  },
  opis: {
    type: String, 
  },
  status: {
    type: String, 
  },
  idR: {
    type: Number, 
  },
  porukaRadnika: {
    type: String, 
  },
  idSto: {
    type: Number
  },
  radnik_kor_ime: {
    type: String, 
  }
},{ versionKey: false });

export default mongoose.model("RezervacijaModel", Rezervacija, "rezervacije");
