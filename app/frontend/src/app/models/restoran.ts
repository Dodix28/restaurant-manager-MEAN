import { Jelo } from "./jelo";
import { Konobar } from "./konobar";
import { Korisnik } from "./user";

export class Restoran{
  naziv: string = '';
  adresa: string = '';
  tip: string = '';
  idR: number =0;
  opis: string = '';
  konobari: Array<Konobar> = [];
  kontakt: string = '';
  jelovnik: Array<Jelo> = [];
  idRaspored: number = 0;
}
