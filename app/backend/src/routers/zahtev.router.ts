import express from "express";
import { ZahtevController, uploadMiddleware } from "../controllers/zahtev.controller";

const zahtevRouter = express.Router();

zahtevRouter
  .route("/addRequest")
  .post((req, res) => new ZahtevController().addRequest(req,res))

zahtevRouter
  .route("/findUsername")
  .post((req, res) => new ZahtevController().findUsername(req,res))

zahtevRouter
  .route("/findMail")
  .post((req, res) => new ZahtevController().findMail(req,res))

zahtevRouter
  .route("/uploadImg")
  .post(uploadMiddleware, (req,res) => new  ZahtevController().uploadImage(req,res));

zahtevRouter
  .route("/getAll")
  .get((req,res) => new  ZahtevController().getAll(req,res));

  
zahtevRouter
.route("/accept")
.post((req, res) => new ZahtevController().acceptRequest(req,res))


zahtevRouter
  .route("/decline")
  .post((req, res) => new ZahtevController().declineRequest(req,res))


export default zahtevRouter;
