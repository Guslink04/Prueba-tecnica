import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from '@env/environment';
import { Firestore, collectionData, collection, addDoc, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Output {
  numero: Number;
  color: String;
  multiplos: Number[];
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent {
  version: string | null = environment.version;
  isLoading = false;
  errorMsg: string = '';
  outputList: Output[] = [];

  @ViewChild('miNumero') miNumero!: ElementRef<HTMLInputElement>;

  private outputsCollection: any;
  output$: Observable<Output[]>;
  constructor(firestore: Firestore) {
    this.outputsCollection = collection(firestore, 'outputs');
    this.output$ = collectionData(this.outputsCollection);
  }
  insertOutput(data: Output) {
    addDoc(this.outputsCollection, data);
  }
  buscarMultiplos() {
    const numero = Number(this.miNumero.nativeElement.value);
    let color: string = '';
    let multiplos: Number[] = [];

    if (numero <= 0) {
      this.errorMsg = 'El número debe ser mayor a 0';
      return;
    }
    [7, 5, 3].forEach((i) => {
      if (numero % i == 0) {
        if (i === 7) {
          color = 'blue';
        } else if (i === 5) {
          color = 'red';
        } else {
          color = 'green';
        }
        multiplos.push(numero / i);
        console.log(numero / i);
      }
    });
    this.insertOutput({
      numero,
      color,
      multiplos,
    });
  }
}
