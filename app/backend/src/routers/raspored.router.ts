import express from "express";
import { RasporedController,uploadFileJson } from "../controllers/raspored.controller";

const rasporedRouter = express.Router();

rasporedRouter
  .route("/uploadFile")
  .post(uploadFileJson, (req, res) => new RasporedController().addRaspored(req,res))

rasporedRouter
  .route("/deleteRaspored")
  .post((req, res) => new RasporedController().deleteRaspored(req,res))

rasporedRouter
  .route("/getRaspored")
  .post((req, res) => new RasporedController().getRaspored(req,res))

rasporedRouter
  .route("/zauzmiSto")
  .post((req, res) => new RasporedController().zauzmiSto(req,res))


export default rasporedRouter;