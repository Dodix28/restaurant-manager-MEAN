import express from "express";
import { RezervacijaController } from "../controllers/rezervacija.controller";

const rezervacijaRouter = express.Router();

rezervacijaRouter
  .route("/addReservation")
  .post((req, res) => new RezervacijaController().addReservation(req,res))

rezervacijaRouter
  .route("/getAktuelne")
  .post((req, res) => new RezervacijaController().getAktuelneRezervacije(req,res))

rezervacijaRouter
  .route("/getIstekle")
  .post((req, res) => new RezervacijaController().getIstekleRezervacije(req,res))

rezervacijaRouter
  .route("/getAll")
  .get((req, res) => new RezervacijaController().getAll(req,res))

rezervacijaRouter
  .route("/getNaCekanju")
  .post((req, res) => new RezervacijaController().getNaCekanjuRezervacije(req,res))

rezervacijaRouter
  .route("/acceptReservation")
  .post((req, res) => new RezervacijaController().acceptReservation(req,res))

rezervacijaRouter
  .route("/declineReservation")
  .post((req, res) => new RezervacijaController().declineReservation(req,res))

export default rezervacijaRouter;