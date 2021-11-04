import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { GastosUsuarioService } from '../services/gastos-usuario.service';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit {
  public erroMsn: string;
  public okMsn: string;

  public gasto = {
    descricao: '',
    formaPagamento: 0,
    tipoGasto: 0,
    valorGasto: 0.0
  };

  tipodeGasto: Array<string>;
  formaPagamento: Array<string>;

  constructor(
    private activatedRoute: ActivatedRoute,
    firestore: AngularFirestore,
    private authService: AuthService,
    private navCtrl: NavController,
    public gastosusuarioService: GastosUsuarioService) {

    this.carregaDadosModelo();
  }

  carregaDadosModelo() {
    this.tipodeGasto = this.gastosusuarioService.tipodeGasto;
    this.formaPagamento = this.gastosusuarioService.formaPagamento;
  }

  ngOnInit() {
  }

  async cadastrarGastos() {
    try {
      await this.gastosusuarioService.registrarGasto(this.gasto);
      this.okMsn = 'Cadastrado com Sucesso!';
      await this.timeout(2000);
      this.navCtrl.navigateRoot('folder/Inicio');
    } catch (error) {
      this.erroMsn = 'Erro ao fazer cadastro!';
      console.log('Error', error.code);
    }
  }

   timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

}
