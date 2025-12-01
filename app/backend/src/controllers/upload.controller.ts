import { Request, Response } from 'express';
import path from 'path';
import multer from 'multer';
import KorisnikModel from '../models/user'; // Prilagodite putanju u skladu sa vašim direktorijumima


 //destinacija gde se fajlovi smestaju i kako se nazivaju 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Koristi originalno ime datoteke
    }
  });

//multer konfiguracija, obrada primljenih fajlova
  const  upload = multer({storage: storage});

  export const uploadMiddleware = upload.single('image');

export class UploadController {

      //obrada post zahteva kada se slika uploaduje
     uploadImage = (req: Request, res: Response) => {
        let kor_ime = req.body.kor_ime;
        
        let fileName = req.body.image.name;
        

          KorisnikModel.findOneAndUpdate({kor_ime: kor_ime}, {profilna: fileName})
            .then(user => {console.log('uspesno update slike'); res.json(user)})
            .catch(err => {console.log('BEZUSPESNO update slike');res.status(400).send(err)});
        };

      };

     
    
