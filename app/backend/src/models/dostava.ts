import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Dostava = new Schema({
    idR : {
        type: Number,
    },
  nazivR: {
    type: String, 
  },
  status: {
    type: String, 
  },
  vremeDostave: {
    type: String,
  },
  stavke: {
    type: Array,
  },
  idD:{
    type: Number, required: true
  },
  kor_ime: {
    type: String,
  }
},{ versionKey: false });

export default mongoose.model("DostavaModel", Dostava, "dostava");