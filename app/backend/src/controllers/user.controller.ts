import * as express from "express";
import KorisnikModel from "../models/user"
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/uploads/');
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname); // Koristi originalno ime datoteke
  }
});

//multer konfiguracija, obrada primljenih fajlova
const  upload = multer({storage: storage});

export const uploadMiddleware = upload.single('image');

export class UserController {
  login = (req: express.Request, res: express.Response) => {
    let kor_ime = req.body.kor_ime;
    let lozinka = req.body.lozinka;

    KorisnikModel.findOne({ kor_ime: kor_ime, lozinka: lozinka })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => console.log(err));
  };

  getUser = (req: express.Request, res: express.Response) => {
    let kor_ime = req.body.kor_ime;

    KorisnikModel.findOne({ kor_ime: kor_ime })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => console.log(err));
  };

  getAllUsers = (req: express.Request, res: express.Response) => {
    KorisnikModel.find({})
    .then((user) => {
      res.json(user);
    })
    .catch((err) => console.log(err));
  };

  getAllGosti = (req: express.Request, res: express.Response) => {
    KorisnikModel.find({tip: "gost"})
    .then((user) => {
      res.json(user);
    })
    .catch((err) => console.log(err));
  };

  getAllKonobari = (req: express.Request, res: express.Response) => {
    KorisnikModel.find({tip: "radnik"})
    .then((user) => {
      res.json(user);
    })
    .catch((err) => console.log(err));
  };

  updateInfoUser = (req: express.Request, res: express.Response) => {
    let kor_ime = req.body.kor_ime;
    let ime = req.body.ime; 
    let prezime = req.body.prezime;
    let mejl = req.body.mejl;
    let kontakt = req.body.kontakt;
    let adresa = req.body.adresa;
    let kartica = req.body.kartica;


    let updateFields: any = {};

    if (ime != '') {
      updateFields.ime = ime;
  }
  if (prezime != '') {
      updateFields.prezime = prezime;
  }
  if (mejl != '') {
      updateFields.mejl = mejl;
  }
  if (kontakt != '') {
      updateFields.kontakt = kontakt;
  }
  if (adresa != '') {
      updateFields.adresa = adresa;
  }
  if (kartica != '') {
      updateFields.brKartice = kartica;
  }
 

    KorisnikModel.findOneAndUpdate({kor_ime: kor_ime}, updateFields , {new: true})
    //.then(updatedUser => { res.json({ 'msg' : 'ok'}); })
    //.catch((err) => {res.json({ 'msg' : 'greska'}); console.log(err)});
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => console.log(err));
  }


  findUsername = (req: express.Request, res: express.Response) => {
    let kor_ime = req.body.kor_ime;

    KorisnikModel.findOne({kor_ime: kor_ime})
    .then((user) => { res.json(user) ; })
    .catch((err) => console.log(err));
  }

  findMail = (req: express.Request, res: express.Response) =>  {
    let mejl = req.body.mejl;

    KorisnikModel.findOne({mejl: mejl})
    .then((user) => { res.json(user) ; })
    .catch((err) => console.log(err));
  }

  findPassword = (req: express.Request, res: express.Response) => {
    let kor_ime = req.body.kor_ime;
    let lozinka = req.body.lozinka;

    KorisnikModel.findOne({kor_ime: kor_ime, lozinka:lozinka})
    .then((user) => { res.json(user) ; })
    .catch((err) => console.log(err));
  }

  updatePassword = (req: express.Request, res: express.Response) => {
    let kor_ime = req.body.kor_ime;
    let lozinka = req.body.lozinka;

    KorisnikModel.findOneAndUpdate({kor_ime: kor_ime}, {lozinka: lozinka})
    .then((user) => { res.json(user) ; })
    .catch((err) => console.log(err));
  }

  uploadImage = (req: express.Request, res: express.Response) => {
    let kor_ime = req.body.kor_ime;
    let fileName: string = req.file ? req.file.filename : 'default.jpg';


    let updateFields: any = {};

    if (fileName != '') {
      updateFields.profilna = fileName;
    }
      console.log(kor_ime);
      console.log(fileName);
      KorisnikModel.findOneAndUpdate({kor_ime: kor_ime}, updateFields,{new: true})
        .then(updatedUser => {console.log(updatedUser); res.json(updatedUser); })
        .catch((err) => console.error('Greška prilikom findOneAndUpdate:', err));
    };

  getImage = (req: express.Request, res: express.Response) => {
       res.sendFile(path.join(__dirname, './src/uploads/${req.params.filename}'));
      };


      addUser = async (req: express.Request, res: express.Response) => {
        let ime =req.body.ime;
        let prezime =req.body.prezime;
        let kor_ime =req.body.kor_ime;
        let lozinka =req.body.lozinka;
        let tip =req.body.tip;
        let mejl =req.body.mejl;
        let pol =req.body.pol;
        let adresa =req.body.adresa;
        let kontakt =req.body.kontakt;
        let brKartice =req.body.brKartice;
        let profilna =req.body.profilna;

        const newUser = new  KorisnikModel({
          ime:ime,
          prezime:prezime,
          kor_ime:kor_ime,
          lozinka:lozinka,
          tip:tip,
          mejl:mejl,
          pol:pol,
          adresa:adresa,
          kontakt: kontakt,
          brKartice: brKartice,
          profilna:profilna
        });

         newUser.save()
        .then((user) => { res.json(user) ; })
        .catch((err) => console.log(err));
      }

      addKonobar = async (req: express.Request, res: express.Response) => {
        let ime =req.body.ime;
        let prezime =req.body.prezime;
        let kor_ime =req.body.kor_ime;
        let lozinka =req.body.lozinka;
        let mejl =req.body.mejl;
        let pol =req.body.pol;
        let adresa =req.body.adresa;
        let kontakt =req.body.kontakt;

        const newUser = new  KorisnikModel({
          ime:ime,
          prezime:prezime,
          kor_ime:kor_ime,
          lozinka:lozinka,
          tip:"radnik",
          mejl:mejl,
          pol:pol,
          adresa:adresa,
          kontakt: kontakt,
          brKartice: "",
          profilna:"default.jpg"
        });
       await  newUser.save()
        .then((user) => { res.json(user) ; })
        .catch((err) => console.log(err));

      }

}
