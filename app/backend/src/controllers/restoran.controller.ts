import * as express from "express";
import RestoranModel from "../models/restoran"

export class RestoranController {

  getAllRestaurants = (req: express.Request, res: express.Response) => {

    RestoranModel.find({ })
      .then((restorani) => {
        res.json(restorani);
      })
      .catch((err) => console.log(err));
  };

  getRestaurant = (req: express.Request, res: express.Response) =>{
    let id = req.body.id;

    RestoranModel.findOne({idR: id})
    .then((restoran) => {
        res.json(restoran);
    })
    .catch((err) => console.log(err));
  };

  addRestaurant = async (req: express.Request, res: express.Response) => {
    let naziv = req.body.naziv;
    let adresa = req.body.adresa;
    let kontakt = req.body.kontakt;
    let opis = req.body.opis;
    let tip = req.body.tip;
    let idRaspored = req.body.idRaspored;

    let max = await RestoranModel.find({}).sort({ idR: -1 }).limit(1);
   
    let x;
        if (max.length > 0) {
            x = max[0].idR + 1;
        } else {
            x = 1;
        }

        let restoran = new RestoranModel({
          naziv:naziv,
          idR: x,
          adresa:adresa,
          tip:tip,
          opis: opis,
          kontakt: kontakt,
          idRaspored:idRaspored,
        });

        await restoran.save()
        .then((r) => {res.json(r);})
        .catch((err) => console.log(err));
  }

  findKonobar = (req: express.Request, res: express.Response) =>  {
    let kor_ime = req.body.kor_ime;

    RestoranModel.findOne({"konobari.kor_ime": kor_ime})
    .then((r) => {console.log("restoran za konobara",r);res.json(r);})
      .catch((err) => console.log(err));

  }

}
