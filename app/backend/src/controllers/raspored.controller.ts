import * as express from "express";
import RasporedModel from "../models/raspored"
import multer from  "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const uploadFileJson = upload.single('file');

export class RasporedController {

 addRaspored = async (req: express.Request, res: express.Response) =>  {
    let max = await RasporedModel.find({}).sort({ idRaspored: -1 }).limit(1);
   
    let x;
        if (max.length > 0) {
            x = max[0].idRaspored + 1;
        } else {
            x = 1;
        }
    if(req.file != null){
        const rasporedData = JSON.parse(req.file.buffer.toString());
        const raspored = new RasporedModel({
            idRaspored: x, ...rasporedData});
            console.log("najveci max",max);
            console.log("najveci id",x);
    await  raspored.save()
    .then(raspored => {console.log(raspored); res.json(raspored); })
    .catch((err) => console.error('Greška prilikom findOneAndUpdate:', err));
    }
 }

  deleteRaspored = (req: express.Request, res: express.Response) =>  {
    let idRaspored = req.body.idRaspored;

    RasporedModel.findOneAndDelete({idRaspored: idRaspored})
    .then(message => { res.json('ok'); })
    .catch((err) => console.error('Greška:', err));
  }

  getRaspored = (req: express.Request, res: express.Response) => {
    let idRaspored = req.body.idRaspored;

    RasporedModel.findOne({idRaspored: idRaspored})
    .then(raspored => { res.json(raspored); })
    .catch((err) => console.error('Greška:', err));
  }

  zauzmiSto = async (req: express.Request, res: express.Response) => {
    let idRaspored = req.body.idRaspored;
    let id = req.body.id;

     RasporedModel.findOneAndUpdate({idRaspored: idRaspored, "stolovi.id":id},{"stolovi.slodan": false})
     .then(raspored => {console.error('OBNOVLJENI RASPORED:', raspored); res.json(raspored); })
    .catch((err) => console.error('Greška:', err));
  }


}