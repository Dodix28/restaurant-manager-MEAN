import express from "express";
import { UserController, uploadMiddleware } from "../controllers/user.controller";
import { UploadController } from "../controllers/upload.controller";
const userRouter = express.Router();

userRouter
  .route("/login")
  .post((req, res) => new UserController().login(req, res));

userRouter
  .route("/getUser")
  .post((req, res) => new UserController().getUser(req, res));

userRouter
  .route("/getAllUsers")
  .get((req, res) => new UserController().getAllUsers(req, res));

  userRouter
  .route("/getAllGosti")
  .get((req, res) => new UserController().getAllGosti(req, res));

  userRouter
  .route("/getAllKonobari")
  .get((req, res) => new UserController().getAllKonobari(req, res));

userRouter
  .route("/updateInfo")
  .post((req,res) => new UserController().updateInfoUser(req,res));

userRouter
  .route("/findUsername")
  .post((req,res) => new UserController().findUsername(req,res));

userRouter
  .route("/findMail")
  .post((req,res) => new UserController().findMail(req,res));

userRouter
  .route("/updatePassword")
  .post((req,res) => new UserController().updatePassword(req,res));

userRouter
  .route("/findPassword")
  .post((req,res) => new UserController().findPassword(req,res));


//specijalno samo za upload profilne
userRouter
  .route("/uploadPic")
  .post(uploadMiddleware, (req,res) => new  UserController().uploadImage(req,res));

userRouter
  .route("/getPic")
  .get((req,res) => new  UserController().getImage(req,res));

userRouter
  .route("/addUser")
  .post((req,res) => new  UserController().addUser(req,res));

  userRouter
  .route("/addKonobar")
  .post((req,res) => new  UserController().addKonobar(req,res));

export default userRouter;
