import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IsoService {

  constructor(private http: HttpClient) { }



  getCodIso(cod: string) {
    return this.http.get(`https://restcountries.eu/rest/v2/alpha/${cod}`);
  }


   generateCaracter(cantidad: number) {
      let text = '';
      const ARR = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
      'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ', ];
      for (let i = 0; i < cantidad; i++) {
        text += ARR [(Math.floor(Math.random() * ARR.length))];
      }
      return text;
     }
}
