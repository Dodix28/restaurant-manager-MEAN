import * as express from "express";
import DostavaModel from "../models/dostava"
import KorpaModel from "../models/korpa"

export class DostavaController {

  addDostava = async (req: express.Request, res: express.Response) => {
    let idR = req.body.idR;
    let nazivR = req.body.nazivR;
    let kor_ime = req.body.kor_ime;

    let max = await DostavaModel.find({}).sort({ idD: -1 }).limit(1);
   
    let x;
        if (max.length > 0) {
            x = max[0].idD + 1;
        } else {
            x = 1;
        }
    
        let dostava = new DostavaModel({
            kor_ime: kor_ime,
            idR: idR,
            nazivR: nazivR,
            status: "na cekanju",
            vremeDostave: "",
            idD: x
        });
   
    await dostava.save()
   .then((dostava) => {res.json(dostava);})
   .catch((err) => console.log(err));
  }

  addStavka =  (req: express.Request, res: express.Response) => {
    let idD = req.body.idD;
    let idJ = req.body.idJ;
    let naziv = req.body.naziv;
    let kolicina = req.body.kolicina;

    let novaStavka = {idJ: idJ, kolicina: kolicina, naziv: naziv};

    DostavaModel.findOneAndUpdate({idD: idD} ,{$push: { stavke: novaStavka}}, {new: true})
    .then((dostava) => {res.json(dostava);})
    .catch((err) => console.log(err));
  }

  completeOrder = (req: express.Request, res: express.Response) => {
    let kor_ime = req.body.kor_ime;
  let idR = req.body.idR; // The restaurant ID associated with the order
  let nazivR = req.body.nazivR; // The restaurant name associated with the order

  KorpaModel.findOne({ kor_ime: kor_ime })
    .then((korpa) => {

      if (korpa) {
        let newDostava = new DostavaModel({
          idR: idR,
          nazivR: nazivR,
          status: "aktuelna",
          vremeDostave: "",
          stavke: korpa.stavke,
        });
  
        return newDostava.save()
          .then((dostava) => {
            // Empty the cart
            korpa.stavke = [];
            return korpa.save().then(() => dostava);
          });
      }

     
    })
    .then((dostava) => {
      res.json(dostava);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });

  }

  getAktuelneDostave = (req: express.Request, res: express.Response) => {
    let kor_ime = req.body.kor_ime;

    DostavaModel.find({status: "prihvaceno", kor_ime: kor_ime})
    .then((dostava) => {res.json(dostava);})
    .catch((err) => console.log(err));
  }

  getAllNaCekanju = (req: express.Request, res: express.Response) => {

    DostavaModel.find({status: "na cekanju"})
    .then((dostava) => {res.json(dostava);})
    .catch((err) => console.log(err));
  }

  acceptOrder  = (req: express.Request, res: express.Response) => {
    let idD = req.body.idD;
    let vremeDostave = req.body.vremeDostave;

    DostavaModel.findOneAndUpdate({idD : idD}, {status:"aktuelno",vremeDostave: vremeDostave })
    .then((dostava) => {res.json(dostava);})
    .catch((err) => console.log(err));
  }

  declineOrder = (req: express.Request, res: express.Response) => {
    let idD = req.body.idD;

    DostavaModel.findOneAndUpdate({idD : idD}, {status:"odbijeno"})
    .then((dostava) => {res.json(dostava);})
    .catch((err) => console.log(err));
  }
}