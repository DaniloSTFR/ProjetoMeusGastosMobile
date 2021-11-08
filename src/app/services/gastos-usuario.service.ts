import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GastosUsuarioService {
  public userId=null;

  public formaPagamento = [
    'Dinheiro'
  , 'Cartão Crédito'
  , 'Cartão Débito'
  , 'Boleto'
  , 'Outros'
  ];

  public tipodeGasto = [
    'Fixo'
  , 'Variável'
  ];

  public categoria = [
    'Alimentação',
    'Bem-Estar',
    'Conveniência',
    'Cultura e Entretenimento',
    'Educação',
    'Gastos Residênciais',
    'Mobilidade',
    'Moradia',
    'Refeição',
    'Saúde',
    'Vestuário',
    'Outras despesas variáveis.'
  ];


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
      .orderBy('dataCriacao', 'desc')
      ).valueChanges({idField: 'docId'});
  }

  async registrarGasto(gasto){
    await this.loadUserId();

    this.firestore.collection('df_gastosUsuario').add({
      descricao: gasto.descricao,
      formaPagamento: this.formaPagamento[gasto.formaPagamento],
      tipoGasto: this.tipodeGasto[gasto.tipoGasto],
      valorGasto: Number(gasto.valorGasto),
      dataCriacao: new Date(),
      categoria: gasto.categoria,
      uuid_Usuario: this.userId
    });

  }

  async excluirGasto(indiceColecao){
    this.firestore.doc('df_gastosUsuario/'+indiceColecao).delete();
  }

  async updateGasto(gasto){
    await this.firestore.doc('df_gastosUsuario/'+gasto.docId).update(gasto);
  }


}
