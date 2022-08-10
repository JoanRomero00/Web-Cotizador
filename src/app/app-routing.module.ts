import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObraComponent } from './obra/obra.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';

const routes: Routes = [
  { path: 'obras', component: ObraComponent },
  { path: '', redirectTo: '/obras', pathMatch: 'full' },
  { path: 'cotizaciones/:id', component: CotizacionComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
