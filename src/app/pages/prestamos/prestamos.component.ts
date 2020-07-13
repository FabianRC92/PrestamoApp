import { Component, OnInit } from '@angular/core';
import { Prestamo } from '../../models/prestamo.model';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { PrestamoService } from '../../services/prestamo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {

  listUsuario: Usuario[] = [];
  objPrestamo: Prestamo = new Prestamo();
  objUsuario: Usuario = new Usuario();
  selectUsuario: string = "";
  valorBase: number;
  titulo: string;
  id: any;

  constructor(private usuarioService: UsuarioService,
    private prestamoService: PrestamoService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) { }

  ngOnInit() {


    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id !== 'nuevo') {

      this.titulo = "Pagar prestamo";
      this.prestamoService.getPrestamo(this.id).subscribe(
        (data: Prestamo) => {
          this.objPrestamo = data;
          this.selectUsuario = data.cedula.toString();
          this.objPrestamo.id = this.id
        }
      );

    } else
      this.titulo = "Solicitar préstamo";

    this.valorBase = parseInt(sessionStorage.getItem("valorBase"));
    this.spinner.show();
    this.usuarioService.consultarUsuario().subscribe(
      data => {
        this.listUsuario = data
      },
      err => {
        this.spinner.hide();
      }
      , () => {
        this.spinner.hide();
      });

  }

  guardar(form: NgForm) {

    if (form.invalid) {

      this.mostrarAlerta('Campos obligatorios', 'Todos los campos son obligatorios', 'warning')

      return;
    }

    if (this.validacionesPrestamo()) {

      if (this.objPrestamo.cedula)
        this.validarPrestamoUsuario(this.objPrestamo.cedula);
      else
        this.mostrarAlerta('Alerta', 'Debe seleccionar un usuario', 'warning');


    }

  }

  modelChangeCedula(e) {
    this.selectUsuario = e;
    this.objPrestamo.cedula = e;
  }

  calcularAprobacion() {

    let valor = Math.floor(Math.random() * 10) + 1;
    this.objPrestamo.aprobado = (valor % 2) ? "Si" : "No";

  }

  validacionesPrestamo(): boolean {

    let resultado: boolean = true;

    if (!this.validarSaldoBanco()) {
      this.mostrarAlerta('Error', 'El valor del prestamo excede al del banco', 'error')
      resultado = false;
    }

    return resultado;

  }


  validarSaldoBanco(): boolean {

    if (this.valorBase < this.objPrestamo.valor)
      return false;
    else return true;

  }

  validarPrestamoUsuario(cedula: number) {

    let cantidad;

    this.spinner.show();
    this.prestamoService.consultarPrestamo().subscribe(

      data => {

        cantidad = data.filter(x => x.cedula == cedula);
        cantidad = cantidad.filter(x => x.aprobado == 'No');
        console.log(cantidad)

        if (cantidad.length > 0) {
          this.mostrarAlerta('Error', 'Este usuario ya le fue negado un prestamo por lo tanto no puede solicitar uno nuevo', 'error')

        } else {

          if (this.id !== 'nuevo')
            this.actualizarUsuario(false);
          else
            this.crearPrestamoUsuario();

        }

        this.spinner.hide();

      });


  }


  crearPrestamoUsuario() {

    this.calcularAprobacion();

    this.mostrarAlerta('Espere', 'Guardando información', 'info')

    this.prestamoService.crearPrestamo(this.objPrestamo).subscribe(
      res => {
        if (res) {

          this.mostrarAlerta((res.aprobado == 'No') ? 'No fue aprobado' : 'Fue aprobado', 'Se ingresó correctamente', 'success')
          if (res.aprobado == 'Si') {
            this.valorBase = this.valorBase - this.objPrestamo.valor
            sessionStorage.setItem("valorBase", this.valorBase.toString());
          }

          this.actualizarUsuario(true, res.aprobado == 'Si' ? true : false, false);

        }
      }
    );

    Swal.showLoading();


  }

  actualizarPrestamo() {

  }

  actualizarUsuario(tipoAct: boolean, estadoC?: boolean, pagoC?: boolean) {

    let id = this.listUsuario.filter(x => x.cedula == this.selectUsuario.toString());

    this.objUsuario = id[0];

    if (tipoAct) {
      this.objUsuario.estadoCredito = estadoC;
      this.objUsuario.valor = this.objPrestamo.valor;
      this.objUsuario.pagoCredito = pagoC;

    }
    else {
      if (this.objUsuario.valor == this.objPrestamo.valor) {
        this.objUsuario.pagoCredito = true;
      }
    }


    this.usuarioService.actualizarUsuario(this.objUsuario);

  }


  mostrarAlerta(titulo: string, mensaje: string, tipo: any) {


    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: tipo,
      allowOutsideClick: false
    });

  }

}
