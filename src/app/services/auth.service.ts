import { Injectable } from '@angular/core';
import { logging } from 'selenium-webdriver';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userId = null;
  public user: any;
  public estaLogado = false;

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
        dataCriacao: '',
        dataNascimento: new Date(),
        formacao: this.formacao[user.formacao],
        esdadoCivil: this.estadoCivil[user.esdadoCivil],
        genero: this.genero[user.genero]
      });
      this.userId = result.user.uid;
      return true;
    }
    return false;
  }

  carregaDadosDoUsuario(){
    this.firestore.doc('du_usuario/'+this.userId).valueChanges({idField: 'docId'}).subscribe(user => {
      this.user = user;
    });
  }

  async login(email, senha){
    const result = await this.fireAuth.signInWithEmailAndPassword(email, senha);
    if(result.user) {
      console.log(result.user.uid);
      this.userId = result.user.uid;
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
    try {
      await this.fireAuth.currentUser.then( user => {
        this.userId = user.uid;
        console.log(user);
      });

      return true;
    }catch (err) {
      return false;
    }
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
