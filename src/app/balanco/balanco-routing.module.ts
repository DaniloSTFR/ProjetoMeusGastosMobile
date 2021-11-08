import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BalancoPage } from './balanco.page';

const routes: Routes = [
  {
    path: '',
    component: BalancoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BalancoPageRoutingModule {}
