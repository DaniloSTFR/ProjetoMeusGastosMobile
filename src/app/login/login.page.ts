import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public autenticacao: string;
  email = '';
  senha = '';

  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) { this.autenticacao = ''; }

  async efetuarLogin() {
    console.log('Efetuando o Login...');
    try {
      const result = await this.authService.login(this.email, this.senha);
      if (result) {
        this.navCtrl.navigateRoot('folder/Inicio');
      }
    } catch (error) {
      console.log('Fallha no login, Usuário ou Senha incorretos.');
      this.autenticacao = 'Fallha no login, Usuário ou Senha incorretos.';
    }

  }

  cadastrar() {
    this.navCtrl.navigateRoot('cadastrar');
  }

  ngOnInit() {
  }

}
