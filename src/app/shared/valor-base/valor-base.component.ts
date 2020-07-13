import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-valor-base',
  templateUrl: './valor-base.component.html',
  styleUrls: ['./valor-base.component.css']
})
export class ValorBaseComponent implements OnInit {

  @Input() valorActual;
  valorBase: number = environment.valorBaseBanco;

  constructor() { }

  ngOnInit() {

    if (sessionStorage.getItem("valorBase") === null)
      sessionStorage.setItem("valorBase", this.valorBase.toString());

    this.valorActual = parseInt(sessionStorage.getItem("valorBase"));
  }

}
