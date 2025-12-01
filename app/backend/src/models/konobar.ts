import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Konobar = new Schema({
  kor_ime: {
    type: String, 
  },
  ime: {
    type: String, 
  },
  prezime: {
    type: String, 
  }
},{ versionKey: false });

export default mongoose.model("KonobarModel", Konobar, "konobari");