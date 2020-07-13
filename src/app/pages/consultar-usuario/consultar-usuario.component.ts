import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-consultar-usuario',
  templateUrl: './consultar-usuario.component.html',
  styles: []
})
export class ConsultarUsuarioComponent implements OnInit {

  objUsuario: Usuario[] = [];
  cargando: boolean = false;

  constructor(private usuarioService: UsuarioService, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.spinner.show();
    this.cargando = true;
    this.usuarioService.consultarUsuario().subscribe(
      data => {
        this.objUsuario = data
        console.log(this.objUsuario)
        this.cargando = false;
        this.spinner.hide();
      });
  }

}
