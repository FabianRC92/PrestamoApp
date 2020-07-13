import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { environment } from '../../environments/environment';
import { map, delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL = environment.URL;

  constructor(private http: HttpClient) { }


  crearUsuario(usuario: Usuario) {

    return this.http.post(`${this.URL}/usuario.json`, usuario).pipe(
      map((data: any) => {
        usuario.cedula = data.cedula;
        return usuario;
      })
    );

  }

  consultarUsuario(){

    return this.http.get(`${this.URL}/usuario.json`).pipe(
      map(
        this.arrayUsuarios
      ),
      delay(1500)
    )

  }

  private arrayUsuarios(objUsuario: object) {

    const usuarios: Usuario[] = [];

    if (objUsuario == null || objUsuario == undefined)
      return null;

    Object.keys(objUsuario).forEach(
      key => {
        const usuario: Usuario = objUsuario[key];
        usuario.id = key;
        usuarios.push(usuario);
      }
    );

    return usuarios;

  }



}
