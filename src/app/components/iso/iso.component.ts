import { Component, OnInit } from '@angular/core';
import { IsoService } from 'src/app/services/iso.service';
import { Observable } from 'rxjs';


interface PAIS {
  flag: string;
  name: string;
}

@Component({
  selector: 'app-iso',
  templateUrl: './iso.component.html',
  styleUrls: ['./iso.component.css']
})

export class IsoComponent implements OnInit {

  codigo = '';
  pais: any;
  stringinicial = '';
  ciclos: any[] = [];
  nuevacadena = '';
  puntaje;

  flag = false;
  constructor(private isoService: IsoService) { }

  ngOnInit() {
  }

  searchIso() {

    this.isoService.getCodIso(this.codigo).subscribe((res: any) => {

      console.log(res);
      this.pais = res;

    },
      error => {
        console.log(error);
        this.pais = null;
      }  // error path
    );
  }




  generarChain() {
    if (!this.flag) {
      this.stringinicial = this.isoService.generateCaracter(26);
    } else {
      this.stringinicial = this.nuevacadena;
      console.log('la cadena con el mayor puntaje es reasignada');
      console.log(this.stringinicial);
    }
    this.flag = true;

  }



  async iniciarCiclo() {

    this.generarChain();
    //  genera el ciclo 50 veces
    const init = await this.ciclo(this.stringinicial);

    // encontrar la cadena con el mayor puntaje
    const max = this.encontrarMaximoPuntaje(init.result);
    this.ciclos = init.result;
    console.log(init.result);
    console.log('objeto max ', max);

    // asignar cadena con el mayor puntaje
    this.nuevacadena = init.result[max.indice].cadena;
    console.log('cadena con mayor puntaje', this.nuevacadena);

    // asignar el puntaje maximo a la variable globla puntaje
    this.puntaje = max.maximum;

    // if (this.puntaje < 26) {
    //   this.iniciarCiclo();
    // }

  }


  encontrarMaximoPuntaje(arr: any[]) {
    let indice;
    const maximum = Math.max.apply(Math, arr.map((o, i) => {
      indice = i;
      return o.puntaje;
    }));


    return { maximum, indice };
  }

  async ciclo(cadena: string) {
    const result = [];

    for (let index = 0; index < 50; index++) {
      const nueva = await this.asignarNuevoCaracter(cadena);
      const puntaje = await this.asignarPuntaje(cadena);
      result.push({ cadena: nueva, puntaje });
    }



    return { result };

  }

  async asignarNuevoCaracter(cadena: string) {


    let nueva = cadena;
    console.log('cadena antes de ser alterada', cadena);


    for (let index = 0; index < cadena.length; index++) {

      const porcentaje = Math.random() * 100;
      let element = nueva.charAt(index);

      // 3% de probabilidad de modificar el caracter de la cadena
      if (porcentaje <= 3) {
        // modificar el caracter
        console.log('antiguo caracter: ', element);
        const ch = this.isoService.generateCaracter(1);
        console.log('nuevo caracter: ', ch);

        nueva = this.setCharAt(nueva, index, ch);




      }
    }
    if (cadena !== nueva) {

      console.log('modficada');

    }
    console.log('cadena despues  de ser alterada', nueva);


    return nueva;
  }

  setCharAt(str: string, index: number, chr: string) {
    if (index > str.length - 1) {
      return str;
    }

    return str.substr(0, index) + chr + str.substr(index + 1);
  }



  async asignarPuntaje(cadena: string) {


    const match = 'MVM INGENIERIA DE SOFTWARE';
    let puntaje = 0;

    for (let index = 0; index < cadena.length; index++) {

      const element = cadena.charAt(index);
      const caracter = match.charAt(index);
      if (element === caracter) {
        console.log(element, 'es igual a', caracter, 'posicion', index);
        puntaje++;
        console.log('puntaje actual', puntaje);
      }

    }

    return puntaje;
  }





}
