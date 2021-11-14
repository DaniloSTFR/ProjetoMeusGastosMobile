import {AfterViewInit, ElementRef, ViewChild, Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { GastosUsuarioService } from '../services/gastos-usuario.service';
import { GastomodelPage } from '../gastomodel/gastomodel.page';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import {CategoryScale} from 'chart.js';
Chart.register(CategoryScale);



@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  @ViewChild('doughnutCanvas')  doughnutCanvas;

  doughnutChart: any;
  user: any;

  public folder: string;
  public status: string;
  item$: Observable<any[]>;
  public erroMsn: string;
  public okMsn: string;
  public salario = 0;
  public debitos = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    firestore: AngularFirestore,
    private authService: AuthService,
    private navCtrl: NavController,
    public gastosusuarioService: GastosUsuarioService,
    public modalController: ModalController,
    private alertCtrl: AlertController) {


  }

  ionViewDidEnter() {
    this.doughnutChartMethod();
  }

  async carregarItem() {
    await this.gastosusuarioService.loadUserId();

    this.item$ = this.gastosusuarioService.getGastosUsuario();
    await this.gastosusuarioService.carregaDadosDoUsuario();

    this.salario = this.gastosusuarioService.user.salario;
    this.user = this.gastosusuarioService.user;

    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    //console.log(this.item$[0] );
  }

  public getDatas(dataCriacao) {
    const timestamp = new Date(dataCriacao.seconds * 1000);
    const timestampSTR = timestamp.getDate() + '-' + (timestamp.getMonth() + 1) + '-' + timestamp.getFullYear();
    return timestampSTR;
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.folder === 'Sair') {
      this.efetuarLogout();
    }
    this.carregarItem();

  }

  doughnutChartMethod() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Credito', 'Débitos'],
        datasets: [{
          label: '# por tipo PG',
          data: [6200, 2000,],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)'
          ],
          hoverBackgroundColor: [
            '#32CD32',
            '#FF6347'
          ]
        }]
      }
    });
  }

  async efetuarLogout() {
    console.log('Efetuando o efetuar Logout...');
    try {
      const result = await this.authService.logout();
      if (result) {
        this.navCtrl.navigateRoot('');
      }
    } catch (error) {
      console.log('Fallha no efetuar Logout.');
    }
  }

  async editar(id) {
    console.log('editar:', id);
  }

  async excluir(id) {
    try {
      await this.gastosusuarioService.excluirGasto(id);
      this.okMsn = 'Excluido com Sucesso!';
      this.erroMsn = '';
      this.limparMsg();
    } catch (error) {
      console.log('Fallha ao fazer exclusão!');
      this.erroMsn = 'Fallha ao fazer exclusão!';
      this.okMsn = '';
      this.limparMsg();
    }
  }

  async editarModelGatos(gastoObj) {
    console.log('Abrindo o gasto ', gastoObj);

    const modal = await this.modalController.create({
      component: GastomodelPage,
      cssClass: 'my-custom-class',
      componentProps: {
        //livro: idGasto,
        gastoObj
      }
    });
    return await modal.present();
  }

  abrirConfirmacaoDialogue(id) {
    this.alertCtrl.create({
      header: 'Confirmar!',
      subHeader: 'Você realmente quer excluir esse gastos?',
      buttons: [
        {
          text: 'Cancelar',
          handler: (data) => {
            this.erroMsn = 'Cancelado!';
            this.okMsn = '';
            this.limparMsg();
          }
        },
        {
          text: 'Sim',
          handler: (data) => {
            this.excluir(id);
          }
        }
      ]
    }).then((confirmElement) => {
      confirmElement.present();
    });
  }

  async limparMsg(){
    await this.timeout(2000);
    this.erroMsn = '';
    this.okMsn = '';
    }
  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }




}
