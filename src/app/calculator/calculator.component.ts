import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from '@env/environment';

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

  constructor() {}

  buscarMultiplos() {
    const valor = Number(this.miNumero.nativeElement.value);
    let color: string = '';
    let multiplos: Number[] = [];

    if (valor <= 0) {
      this.errorMsg = 'El número debe ser mayor a 0';
      return;
    }
    [7, 5, 3].forEach((i) => {
      if (valor % i == 0) {
        if (i === 7) {
          color = 'blue';
        } else if (i === 5) {
          color = 'red';
        } else {
          color = 'green';
        }
        multiplos.push(valor / i);
        console.log(valor / i);
      }
    });
    this.outputList.unshift({
      numero: valor,
      color,
      multiplos,
    });
  }
}
