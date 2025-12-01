import express from "express";
import { JeloController } from "../controllers/jelo.controller";

const jeloRouter = express.Router();

jeloRouter
  .route("/getMeal")
  .post((req, res) => new JeloController().getMeal(req,res))


export default jeloRouter;