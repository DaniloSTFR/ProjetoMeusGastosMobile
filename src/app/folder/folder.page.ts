import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { GastosUsuarioService } from '../services/gastos-usuario.service';
import { Observable } from 'rxjs';

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
    public gastosusuarioService: GastosUsuarioService) {

   this.carregarItem();
   }

   async carregarItem(){
    await this.gastosusuarioService.loadUserId();
    this.item$ = this.gastosusuarioService.getGastosUsuario();
   }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    //this.carregarItem();
    //this.gastosusuarioService.loadUserId();
    //this.item$ = this.gastosusuarioService.getGastosUsuario();
  }

}
