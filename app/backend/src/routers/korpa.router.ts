import express from "express";
import { KorpaController } from "../controllers/korpa.controller";


const korpaRouter = express.Router();

korpaRouter
  .route("/getUser")
  .post((req, res) => new KorpaController().getUser(req,res))

korpaRouter
  .route("/addStavka")
  .post((req, res) => new KorpaController().addStavka(req,res))

korpaRouter
  .route("/addKorpa")
  .post((req, res) => new KorpaController().addKorpa(req,res))

korpaRouter
  .route("/deleteKorpa")
  .post((req, res) => new KorpaController().deleteKorpa(req,res))


export default korpaRouter;