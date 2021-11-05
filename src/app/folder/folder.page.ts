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
    console.log( this.item$[0]);
   }

   public getDatas( dataCriacao) {
    const timestamp = new Date(dataCriacao.seconds * 1000);
    const timestampSTR = timestamp.getDate() + '-'+ (timestamp.getMonth() + 1) + '-'  + timestamp.getFullYear();
    return timestampSTR;
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

  async editar( id) {
    console.log('editar:',id);
  }

  async excluir( id) {
    try {
      await this.gastosusuarioService.excluirGasto(id);
    } catch (error) {
      console.log('Fallha ao fazer exclusão');
    }
  }


}
