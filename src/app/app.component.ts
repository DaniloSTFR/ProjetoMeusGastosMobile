import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Início', url: '/folder/Inbox', icon: 'home' },
    { title: 'Cadastrar gastos', url: '/folder/Outbox', icon: 'wallet' },
    { title: 'Balanço', url: '/folder/Favorites', icon: 'bar-chart' },
    { title: 'Customizar', url: '/folder/Archived', icon: 'extension-puzzle' },
    { title: 'Notificações', url: '/folder/Trash', icon: 'warning' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Ajuda', 'Temos de Uso', 'Política De Privacidade', 'Sair'];
  constructor() {}
}
