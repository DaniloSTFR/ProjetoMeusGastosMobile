import { Injectable } from '@angular/core';
import { logging } from 'selenium-webdriver';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userId = null;
  public user: any;
  public estaLogado = false;
  public listaUser: Observable<any[]>;

  public formacao = [
    'Ensino Médio'
    , 'Ensino Superior Incompleto'
    , 'Ensino Superior Completo'
    , 'Especialização Completa'
    , 'Mestrado Completo'
    , 'Doutorado Completo'
  ];

  public genero = [
  'Masculino'
  , 'Feminino'
  , 'Outros'
  ];

  public estadoCivil = [
      'Solteiro'
    , 'Casado'
    , 'União Estável'
    , 'Outros'
    ];

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {

   }

   async cadastro(user){
    const result = await this.fireAuth.createUserWithEmailAndPassword(user.email, user.senha);
    if(result.user){
      this.firestore.doc('du_usuario/'+result.user.uid).set({
        nome: user.nome,
        email: user.email,
        dataCriacao: new Date(),
        dataNascimento: new Date(Date.parse(user.dataNascimento)),
        formacao: this.formacao[user.formacao],
        esdadoCivil: this.estadoCivil[user.esdadoCivil],
        genero: this.genero[user.genero],
        tipoUsuario: 'user',
        uuid_Usuario:result.user.uid
      });
      this.userId = result.user.uid;
      return true;
    }
    return false;
  }

  async carregaDadosDoUsuario(){
    await this.firestore.doc('du_usuario/'+this.userId).valueChanges({idField: 'docId'}).subscribe(user => {
      this.user = user;
    });
  }
  async updateDuUsuario(duUsuario){
    await this.firestore.doc('du_usuario/'+duUsuario.docId).update(duUsuario);
  }


  async getDadosUsuario(){ //pega os dados doUsuario
    this.userId = firebase.auth().currentUser.uid;
    console.log(firebase.auth().currentUser);
    console.log(this.userId);
    return this.listaUser=this.firestore.collection<any>('du_usuario', ref => ref.where('uuid_Usuario', '==', this.userId)).valueChanges();
  }


  async login(email, senha){
    const result = await this.fireAuth.signInWithEmailAndPassword(email, senha);
    if(result.user) {
     // console.log(result.user.uid);
      this.userId = result.user.uid;
      this.carregaDadosDoUsuario();
      this.estaLogado = true;
      return true;
    }
    else {
      this.estaLogado = false;
      return false;
    }
  }

  async logout(){
      await this.fireAuth.signOut();
      return true;
  }

  async loadUserId(){
    await this.fireAuth.currentUser.then( user => {
      this.userId = user.uid;
      //console.log(user);
    });
  }

  async userIsAuthenticated(){
    //console.log(this.fireAuth.currentUser);
    if((await this.fireAuth.currentUser).uid ){
      return true;
    }else{
      return false;
    }
  }

}
