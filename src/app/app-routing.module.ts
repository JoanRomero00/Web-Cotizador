import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObraComponent } from './obra/obra.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { StepComponent } from './step/step.component';

const routes: Routes = [
  { path: 'welcome', component: ObraComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'cotizador/:id/:piso/:depto', component: CotizacionComponent },
  { path: 'cotizacionfinal', component: StepComponent },
  { path: 'step', redirectTo: '/cotizacionfinal', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
