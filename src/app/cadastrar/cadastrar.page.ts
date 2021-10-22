import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})


export class CadastrarPage implements OnInit {
  public erroMsn: string;
  public dataNascimento: string;

  escolaridades: Array<string>;
  generos: Array<string>;
  estadosCivis: Array<string>;

  user = {
    email: '',
    senha: '',
    repetirSenha: '',
    nome: '',
    idade: 0,
    dataNascimento: '01-01-1991',
    formacao: 0,
    genero: 0,
    esdadoCivil:0
  };

  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    console.log(this.user);
    this.dataNascimento = '01-01-1991';
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
    try {
      if (this.user.senha === this.user.repetirSenha && this.user.senha !== '' && this.user.repetirSenha !== '') {
        console.log('Efetuando o Cadastro...', this.user);
        const result = await this.authService.cadastro(this.user);
        if (result) {
          this.navCtrl.navigateRoot('folder/Inicio');
        }
      } else {
        console.log('Fallha no cadastro, as senhas não são iguais.');
        this.erroMsn = 'Fallha no cadastro, as senhas não são iguais.';
      }

    } catch (error) {
      if(error.code === 'auth/weak-password'){
        this.erroMsn = 'Fallha no cadastro, a senha não pode possuir menos de 6 caracteres';
      }else if(error.code === 'auth/email-already-in-use'){
          this.erroMsn = 'Fallha no cadastro, e-mail já cadastrado.';
      }else{
        this.erroMsn = 'Fallha no cadastro, erro na comunicação com Firebase';
      }

      console.log('Error', error.code);
    }

  }

  voltar() {
    this.navCtrl.navigateRoot('pefil');
  }

}
