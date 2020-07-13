import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrestamosComponent } from './pages/prestamos/prestamos.component';
import { ValorBaseComponent } from './shared/valor-base/valor-base.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConsultarUsuarioComponent } from './pages/consultar-usuario/consultar-usuario.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ConsultarPrestamoComponent } from './pages/consultar-prestamo/consultar-prestamo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 


@NgModule({
  declarations: [
    AppComponent,
    PrestamosComponent,
    ValorBaseComponent,
    NavbarComponent,
    HomeComponent,
    UsuarioComponent,
    ConsultarUsuarioComponent,
    ConsultarPrestamoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
