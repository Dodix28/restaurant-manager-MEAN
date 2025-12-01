import { Jelo } from "./jelo";

export class Dostava {
  idR: number = 0;
  nazivR: string = '';

  stavke: Array<Jelo> = []; //unutra je jelo i njegova kolicina

  vremeDostave: string = '';  //konobar unosi, procenjeno vreme
  status: string = ''; //konobar odbija ili prihvata
  idD: number = 0;
}
