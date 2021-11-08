import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GastomodelPageRoutingModule } from './gastomodel-routing.module';

import { GastomodelPage } from './gastomodel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GastomodelPageRoutingModule
  ],
  declarations: [GastomodelPage]
})
export class GastomodelPageModule {}
