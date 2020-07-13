import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-consultar-usuario',
  templateUrl: './consultar-usuario.component.html',
  styles: []
})
export class ConsultarUsuarioComponent implements OnInit {

  objUsuario: Usuario[] = [];
  cargando: boolean = false;

  constructor(private usuarioService:UsuarioService) { }

  ngOnInit() {
    this.cargando = true;
    this.usuarioService.consultarUsuario().subscribe(
      data => {
        this.objUsuario = data
        console.log(this.objUsuario)
        this.cargando = false;
      });
  }

}
