import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { NgForm } from "@angular/forms";
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';



@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {


  objUsuario: Usuario = new Usuario();
  selectPago: string = '';
  selectEstado: string = '';

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {

  }

  modelChangePagoC(e) {
    this.objUsuario.pagoCredito = e;
  }

  modelChangeEstadoC(e) {
    this.objUsuario.estadoCredito = e;
  }

  guardar(form: NgForm) {
    if (form.invalid) {

      Swal.fire({
        title: 'Campos olbigatorios',
        text: 'Todos los campos son obligatorios',
        icon: "warning"
      });

      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();

    this.usuarioService.crearUsuario(this.objUsuario).subscribe(
      res => {
        if (res) {
          Swal.fire({
            title: res.nombre,
            text: 'Se ingresó correctamente',
            icon: "success"
          });
        }
      }
    );

  }

}
