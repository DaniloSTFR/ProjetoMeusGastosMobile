import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})


export class CadastrarPage implements OnInit {

  escolaridades: Array<string>;
  generos: Array<string>;
  estadosCivis: Array<string>;

  user = {
    email: '',
    senha: '',
    nome: '',
    idade: 0,
    formacao: 0,
    genero: 0,
    esdadoCivil:0
  };

  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    console.log(this.user);
    this.carregaDadosModelo();
  }

  carregaDadosModelo(){
    this.escolaridades = this.authService.formacao;
    this.generos = this.authService.genero;
    this.estadosCivis = this.authService.estadoCivil;
  }

  ngOnInit() {
  }

  async cadastrar() {
    console.log('Efetuando o Cadastro...', this.user);
    const result = await this.authService.cadastro(this.user);
    if (result) {
      this.navCtrl.navigateRoot('folder/Inicio');
    }
  }

  voltar() {
    this.navCtrl.navigateRoot('pefil');
  }

}
