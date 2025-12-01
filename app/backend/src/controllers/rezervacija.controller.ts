import * as express from "express";
import RezervacijaModel from "../models/rezervacija"

export class RezervacijaController {

  addReservation = (req: express.Request, res: express.Response) => {

    let datum = req.body.datum;
    let vreme = req.body.vreme;
    let brOsoba = req.body.brOsoba;
    let opis = req.body.opis;
    let idR = req.body.idR;

    const newReservation = new RezervacijaModel({
        datum: datum, vreme: vreme,brOsoba: brOsoba, opis: opis, status: "na cekanju",
        idR: idR, porukaRadnika: "", idSto: 0,radnik_kor_ime: ""
    })
     newReservation.save()
      .then((rezervacija) => {
        console.log(rezervacija);
        res.json(rezervacija);
      })
      .catch((err) => console.log(err));
  };

  getAktuelneRezervacije = (req: express.Request, res: express.Response) => {
    let kor_ime = req.body.kor_ime;

    RezervacijaModel.find({status: "aktuelna", kor_ime: kor_ime})
    .then((rezervacije) => {res.json(rezervacije);})
    .catch((err) => console.log(err));
  }

  getIstekleRezervacije = (req: express.Request, res: express.Response) => {
    let kor_ime = req.body.kor_ime;

    RezervacijaModel.find({status: "istekla", kor_ime: kor_ime})
    .then((rezervacije) => {res.json(rezervacije);})
    .catch((err) => console.log(err));
  }

  getNaCekanjuRezervacije = (req: express.Request, res: express.Response) => {
    let idR = req.body.idR;

    RezervacijaModel.find({status: "na cekanju", idR:idR})
    .then((rezervacije) => {console.log("Nadjeni rezervacije",rezervacije); res.json(rezervacije);})
    .catch((err) => console.log(err));
  }

getAll = (req: express.Request, res: express.Response) => {
  RezervacijaModel.find({})
  .then((rezervacije) => {res.json(rezervacije);})
  .catch((err) => console.log(err));
}

acceptReservation  = (req: express.Request, res: express.Response) => {
  let idRez = req.body.idRez;
  let idSto = req.body.idSto;
  let radnik_kor_ime = req.body.radnik_kor_ime;
  console.log("id stola: pre",idSto);
  RezervacijaModel.findOneAndUpdate({idRez : idRez}, {status:"aktuelno", idSto:idSto, radnik_kor_ime: radnik_kor_ime},{new:true})
  .then((rezervacija) => { console.log("Rezervacija nakon accept:",rezervacija);res.json(rezervacija);})
  .catch((err) => console.log(err));
}

declineReservation = (req: express.Request, res: express.Response) => {
  let idRez = req.body.idRez;
  let porukaRadnika = req.body.porukaRadnika;

  RezervacijaModel.findOneAndUpdate({idRez : idRez}, {status:"odbijeno",porukaRadnika: porukaRadnika })
  .then((rezervacija) => {res.json(rezervacija);})
  .catch((err) => console.log(err));
}

}