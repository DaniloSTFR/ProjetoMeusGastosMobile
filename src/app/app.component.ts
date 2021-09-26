import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Início', url: '/folder/Inicio', icon: 'home' },
    { title: 'Cadastrar gastos', url: '/folder/CadastrarGastos', icon: 'wallet' },
    { title: 'Balanço', url: '/folder/Balanco', icon: 'bar-chart' },
    { title: 'Customizar', url: '/folder/Customizar', icon: 'extension-puzzle' },
    { title: 'Notificações', url: '/folder/Notificacoes', icon: 'warning' },
    { title: 'Sair', url: '/folder/Sair', icon: 'exit' },
  ];
  public labels = ['Ajuda', 'Temos de Uso', 'Política De Privacidade'];
  constructor() {}
}
