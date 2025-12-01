import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routers/user.router";
import restoranRouter from "./routers/restoran.router";
import zahtevRouter from "./routers/zahtev.router";
import path from "path";
import rezervacijaRouter from "./routers/rezervacija.router";
import jeloRouter from "./routers/jelo.router";
import dostavaRouter from "./routers/dostava.router";
import korpaRouter from "./routers/korpa.router";
import rasporedRouter from "./routers/raspored.router";

const app = express();
app.use(cors());
app.use(express.json());




mongoose.connect("mongodb://127.0.0.1:27017/dobraHrana");
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("db connection ok");
});



const router = express.Router();
router.use("/users", userRouter);
router.use("/restaurants", restoranRouter);
router.use("/requests", zahtevRouter);
router.use("/reservations", rezervacijaRouter);
router.use("/meals", jeloRouter);
router.use("/dostava", dostavaRouter);
router.use("/korpa", korpaRouter);
router.use("/raspored", rasporedRouter);
app.use('/uploads', express.static(path.join(__dirname, '../src/uploads')));

/*app.get('/image/:filename', (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, '../src/uploads', filename);
  res.sendFile(imagePath);
});*/

app.use("/", router);
/*app.get('/', (req, res) => {
  res.send('Pozdrav, ovo je osnovna ruta!');
});*/

app.listen(4000, () => console.log(`Express server running on port 4000`));


