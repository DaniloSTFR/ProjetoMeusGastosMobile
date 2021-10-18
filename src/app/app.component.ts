import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public authenticated: boolean;
  public authenticated$: Observable<any>;

  public appPages = [
    { title: 'Início', url: '/folder/Inicio', icon: 'home' },
    { title: 'Cadastrar gastos', url: '/folder/CadastrarGastos', icon: 'wallet' },
    { title: 'Balanço', url: '/folder/Balanco', icon: 'bar-chart' },
    { title: 'Customizar', url: '/folder/Customizar', icon: 'extension-puzzle' },
    { title: 'Notificações', url: '/folder/Notificacoes', icon: 'warning' },
    { title: 'Sair', url: '/folder/Sair', icon: 'exit' },
  ];
  public labels = ['Ajuda', 'Temos de Uso', 'Política De Privacidade'];
  constructor(private authService: AuthService) {
    this.carregarMenu();
    console.log('carregando...');
  }

  async ngOnInit() {
    this.authenticated = true;
    //await this.authService.loadUserId();
    //console.log(this.authService.userId );
    this.authenticated = await this.authService.loadUserId? false : true;

  }

  async carregarMenu(){
    //this.authenticated = true;
    //await this.authService.loadUserId();
    //console.log(this.authService.userId );
    //this.authenticated = await this.authService.userId == null ? false:true;
  }
}
