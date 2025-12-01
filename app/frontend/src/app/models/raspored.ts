import { Kuhinja } from "./kuhinja";
import { Sto } from "./sto";
import { Toalet } from "./toalet";

export class Raspored {
  idRaspored: number = 0;
  kuhinje: Kuhinja[] =[];
  toaleti: Toalet[] = [];
  stolovi: Sto[] = [];
}
