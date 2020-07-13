import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PrestamosComponent } from './pages/prestamos/prestamos.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { ConsultarUsuarioComponent } from './pages/consultar-usuario/consultar-usuario.component';
import { ConsultarPrestamoComponent } from './pages/consultar-prestamo/consultar-prestamo.component';


const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'prestamo/:id', component: PrestamosComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'consulta-usuario', component: ConsultarUsuarioComponent },
  { path: 'consulta-prestamo', component: ConsultarPrestamoComponent },
  // { path: '**', pathMatch: 'full', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
