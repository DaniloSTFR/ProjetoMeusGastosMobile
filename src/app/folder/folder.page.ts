import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { GastosUsuarioService } from '../services/gastos-usuario.service';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  item$: Observable<any[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    firestore: AngularFirestore,
    private authService: AuthService,
    private navCtrl: NavController,
    public gastosusuarioService: GastosUsuarioService) {

   this.carregarItem();
   }

   async carregarItem(){
    await this.gastosusuarioService.loadUserId();
    this.item$ = this.gastosusuarioService.getGastosUsuario();
   }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.folder === 'Sair'){
      this.efetuarLogout();
    }
    //this.carregarItem();
    //this.gastosusuarioService.loadUserId();
    //this.item$ = this.gastosusuarioService.getGastosUsuario();
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
}
