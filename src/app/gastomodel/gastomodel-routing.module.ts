import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GastomodelPage } from './gastomodel.page';

const routes: Routes = [
  {
    path: '',
    component: GastomodelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GastomodelPageRoutingModule {}
