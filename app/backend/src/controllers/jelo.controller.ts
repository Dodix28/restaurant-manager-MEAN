import * as express from "express";
import JeloModel from "../models/jelo"

export class JeloController {

  getMeal = (req: express.Request, res: express.Response) => {
    let idJ = req.body.idJ;

    JeloModel.findOne({idJ : idJ})
      .then((jelo) => {
        res.json(jelo);
      })
      .catch((err) => console.log(err));
  };


}