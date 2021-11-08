import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { GastosUsuarioService } from '../services/gastos-usuario.service';

@Component({
  selector: 'app-gastomodel',
  templateUrl: './gastomodel.page.html',
  styleUrls: ['./gastomodel.page.scss'],
})
export class GastomodelPage implements OnInit {

  @Input() gastoObj: any;
  public erroMsn: string;
  public okMsn: string;

  public gasto = {
    descricao: '',
    formaPagamento: 0,
    tipoGasto: 0,
    categoria: 0,
    valorGasto: 0.0,
    dataCriacao: new Date(),
    docId : '',
    uuid_Usuario: ''


  };


  tipodeGasto: Array<string>;
  formaPagamento: Array<string>;
  categorias: Array<string>;
  public timestamp: any;
  public timestampSTR = '';

  constructor(
    public modalCtrl: ModalController,
    public gastosusuarioService: GastosUsuarioService,
    private navCtrl: NavController,
  ) {

  }
  carregaDadosModelo() {

    this.timestamp = new Date(this.gastoObj.dataCriacao.seconds * 1000);
    // eslint-disable-next-line max-len
    this.timestampSTR = (this.timestamp.getMonth() + 1) + '-' + this.timestamp.getDate() + '-' + this.timestamp.getFullYear();
    // eslint-disable-next-line max-len
    //this.gasto.dataCriacao = this.timestampSTR ;


    this.gasto.descricao =  this.gastoObj.descricao;
    this.gasto.formaPagamento = this.gastoObj.formaPagamento;
    this.gasto.tipoGasto = this.gastoObj.tipoGasto;
    this.gasto.categoria = this.gastoObj.categoria;
    this.gasto.valorGasto =  this.gastoObj.valorGasto;
    this.gasto.uuid_Usuario =  this.gastoObj.uuid_Usuario;
    this.gasto.docId = this.gastoObj.docId;


    this.tipodeGasto = this.gastosusuarioService.tipodeGasto;
    this.formaPagamento = this.gastosusuarioService.formaPagamento;
    this.categorias = this.gastosusuarioService.categoria;
  }

  ngOnInit() {
    this.carregaDadosModelo();
  }

  dismiss(){
    this.modalCtrl.dismiss({
      dismiss: true
    });

  }


  async updateGasto() {
    try {

      console.log('Update:');
      console.log(this.timestampSTR);
      this.gasto.dataCriacao = new Date(this.timestampSTR);

      await this.gastosusuarioService.updateGasto(this.gasto);

      this.okMsn = 'Atualizado com sucesso com Sucesso!';
      await this.timeout(2000);
      this.dismiss();
    } catch (error) {
       this.erroMsn = 'Erro ao fazer atualização!';
      console.log('Error', error.code);
    }

  }

  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
