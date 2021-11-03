import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { IonRadioGroup } from '@ionic/angular';
@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss']
})
export class PerfilPage implements OnInit {
  @ViewChild('radioGroup') radioGroup: IonRadioGroup;

  public erroMsn: string;
  public dataNascimento: string;
  escolaridades: Array<string>;
  generos: Array<string>;
  estadosCivis: Array<string>;
  public timestamp: any;
  public timestampSTR = '';

  user = {
    email: '',
    nome: '',
    idade: 0,
    dataNascimento: new Date(),
    formacao: '',
    genero: '',
    esdadoCivil: '',
    salario: 0,
    tipoUsuario: 'user'
  };

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    firestore: AngularFirestore
  ) {

    this.carregaDadosModelo();
  }

  async carregaDadosModelo() {
    await this.authService.loadUserId();
    await this.authService.carregaDadosDoUsuario();

    //this.user = this.authService.user;
    this.timestamp = new Date(this.authService.user.dataNascimento.seconds * 1000);

    this.user = this.authService.user;

    this.user.email = this.authService.user.email;
    this.user.nome = this.authService.user.nome;
    this.user.idade = 30;

    this.timestampSTR = (this.timestamp.getMonth() + 1) + '-' + this.timestamp.getDate() + '-' + this.timestamp.getFullYear();
    // eslint-disable-next-line max-len
    this.user.dataNascimento = new Date((this.timestamp.getMonth() + 1) + '-' + this.timestamp.getDate() + '-' + this.timestamp.getFullYear());

    this.user.salario = this.authService.user.salario;
    this.user.formacao = this.authService.user.formacao;
    this.user.genero = this.authService.user.genero;
    this.user.esdadoCivil = this.authService.user.esdadoCivil;

    this.escolaridades = this.authService.formacao;
    this.generos = this.authService.genero;
    this.estadosCivis = this.authService.estadoCivil;



    //let dados = this.authService.getDadosUsuario();
    console.log(this.user);
  }

  ngOnInit() {
    //this.carregaDadosModelo();
  }

  async updateDuUsuario() {
    try {

      console.log('Update:');
      console.log(this.user.dataNascimento);
      const nascimento = new Date(this.user.dataNascimento);
      this.user.dataNascimento = nascimento;
      await this.authService.updateDuUsuario(this.user);
    } catch (error) {
      console.log('Error', error.code);
    }

  }

}
