import express from "express";
import { RestoranController } from "../controllers/restoran.controller";
const restoranRouter = express.Router();

restoranRouter
  .route("/getAllRestaurants")
  .get((req, res) => new RestoranController().getAllRestaurants(req,res))

restoranRouter
  .route("/getRestaurant")
  .post((req, res) => new RestoranController().getRestaurant(req,res))

restoranRouter
  .route("/addRestaurant")
  .post((req, res) => new RestoranController().addRestaurant(req,res))

restoranRouter
  .route("/findKonobar")
  .post((req, res) => new RestoranController().findKonobar(req,res))

export default restoranRouter;
