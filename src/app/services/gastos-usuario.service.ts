import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GastosUsuarioService {
  public userId=null;


  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {

  }

  async loadUserId(){
    await this.fireAuth.currentUser.then( user => {
      this.userId = user.uid;
      //console.log(user);
    });
  }


  getGastosUsuario(){ //pega os gatos do Usuario
    //console.log('user:'+this.userId );
     return this.firestore.collection('df_gastosUsuario',
    ref => ref
      .where('uuid_Usuario','==', this.userId)
      ).valueChanges();

    return this.firestore.collection('df_gastosUsuario').valueChanges();
  }

}
