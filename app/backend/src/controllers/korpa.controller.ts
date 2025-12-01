import * as express from "express";
import KorpaModel from "../models/korpa"

export class KorpaController {

  getUser = (req: express.Request, res: express.Response) => {
    let kor_ime = req.body.kor_ime;

    KorpaModel.findOne({kor_ime : kor_ime})
      .then((korpa) => {
        res.json(korpa);
      })
      .catch((err) => console.log(err));
  };

  addKorpa = (req: express.Request, res: express.Response) => {
    let kor_ime = req.body.kor_ime;

    const newKorpa = new KorpaModel({
        kor_ime:kor_ime,
        stavke: [],
    })
    newKorpa.save()
    .then((korpa) => {
        console.log("dodata nova korpa0", korpa);
        res.json(korpa);
      })
      .catch((err) => {
        console.log("greska pri pravljenju NOVE KORPE");
        console.log(err) 
       })
  }

  addStavka = (req: express.Request, res: express.Response) => {
    let kor_ime = req.body.kor_ime;
    let idJ = req.body.idJ;
    let kolicina = req.body.kolicina;
    let naziv = req.body.naziv;


    KorpaModel.findOne({ kor_ime: kor_ime, 'stavke.idJ': idJ })
    .then((korpa) => {
        if (!korpa) {
            // Ako korpa ne postoji ili stavka nije pronađena, dodajte novu stavku
            return KorpaModel.findOneAndUpdate(
                { kor_ime: kor_ime },
                { $push: { stavke: { idJ, kolicina, naziv } } },
                { new: true, upsert: true }
            ).then((newKorpa) => {
                res.json(newKorpa);
            });
        } else {
            // Ako je korpa pronađena i stavka postoji, inkrementirajte količinu
            return KorpaModel.findOneAndUpdate(
                { kor_ime: kor_ime, 'stavke.idJ': idJ },
                { $inc: { 'stavke.$.kolicina': kolicina } },
                { new: true }
            ).then((updatedKorpa) => {
                res.json(updatedKorpa);
            });
        }
    })
    .catch((err) => {
        console.log("GRESKA");
        console.log(err);
        res.status(500).send(err);
    });
    
  }

  deleteKorpa = (req: express.Request, res: express.Response) => {
    let kor_ime = req.body.kor_ime;

    KorpaModel.findOneAndDelete({ kor_ime: kor_ime })
    .then((result) => {
        if(result){
            res.json({ message: "ok" });
        } else {
            res.status(404).json({ message: "Korpa nije pronađena" });
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Greška prilikom brisanja korpe", error: err });
    });
};


}