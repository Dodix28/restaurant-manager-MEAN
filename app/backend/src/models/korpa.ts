import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Korpa = new Schema({
  kor_ime: {
    type: String, 
  },
  stavke: {
    type: Array, 
  }
},{ versionKey: false });

export default mongoose.model("KorpaModel", Korpa, "korpa");