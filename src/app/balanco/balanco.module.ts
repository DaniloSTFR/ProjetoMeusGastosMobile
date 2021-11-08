import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BalancoPageRoutingModule } from './balanco-routing.module';

import { BalancoPage } from './balanco.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BalancoPageRoutingModule
  ],
  declarations: [BalancoPage]
})
export class BalancoPageModule {}
