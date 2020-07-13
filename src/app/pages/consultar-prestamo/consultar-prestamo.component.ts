import { Component, OnInit } from '@angular/core';
import { Prestamo } from '../../models/prestamo.model';
import { PrestamoService } from '../../services/prestamo.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-consultar-prestamo',
  templateUrl: './consultar-prestamo.component.html',
  styleUrls: ['./consultar-prestamo.component.css']
})
export class ConsultarPrestamoComponent implements OnInit {

  objPrestamo: Prestamo[] = [];
  cargando: boolean = false;

  constructor(private prestamoService: PrestamoService,private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.spinner.show();
    this.cargando = true;
    this.prestamoService.consultarPrestamo().subscribe(
      data => {
        this.objPrestamo = data
        this.cargando = false;
        this.spinner.hide();
      });
  }

}
