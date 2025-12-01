import express from "express";
import { DostavaController } from "../controllers/dostava.controller";


const dostavaRouter = express.Router();

dostavaRouter
  .route("/addDostava")
  .post((req, res) => new DostavaController().addDostava(req,res))

dostavaRouter
  .route("/addStavka")
  .post((req, res) => new DostavaController().addStavka(req,res))

dostavaRouter
  .route("/getAktuelneDostave")
  .post((req, res) => new DostavaController().getAktuelneDostave(req,res))

dostavaRouter
  .route("/getNaCekanju")
  .get((req, res) => new DostavaController().getAllNaCekanju(req,res))

  dostavaRouter
  .route("/acceptOrder")
  .post((req, res) => new DostavaController().acceptOrder(req,res))

  dostavaRouter
  .route("/declineOrder")
  .post((req, res) => new DostavaController().declineOrder(req,res))


export default dostavaRouter;