import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Raspored = new Schema({
    idRaspored : {
        type: Number, required: true
    },
  kuhinje: {
    type: Array, 
  },
  toaleti: {
    type: Array, 
  },
  stolovi: {
    type: Array,
  }
},{ versionKey: false });

export default mongoose.model("RasporedModel", Raspored, "rasporedi");