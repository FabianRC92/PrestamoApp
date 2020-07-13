import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { Prestamo } from '../models/prestamo.model';
import { map, delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  private URL = environment.URL;

  constructor(private http: HttpClient) { }


  crearPrestamo(prestamo: Prestamo) {

    return this.http.post(`${this.URL}/prestamo.json`, prestamo).pipe(
      map((data: any) => {
        prestamo.cedula = data.cedula;
        return prestamo;
      })
    );

  }

  consultarPrestamo() {

    return this.http.get(`${this.URL}/prestamo.json`).pipe(
      map(
        this.arrayPrestamo
      ),
      delay(1500)
    )

  }

  private arrayPrestamo(objPrestamo: object) {

    const prestamos: Prestamo[] = [];

    if (objPrestamo == null || objPrestamo == undefined)
      return null;

    Object.keys(objPrestamo).forEach(
      key => {
        const prestamo: Prestamo = objPrestamo[key];
        prestamo.id = key;
        prestamos.push(prestamo);
      }
    );

    return prestamos;

  }

  getPrestamo(id: string) {
    return this.http.get(`${this.URL}/prestamo/${id}.json`);
  }  

}
