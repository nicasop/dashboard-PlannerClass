import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Database, set, ref, update, onValue } from '@angular/fire/database';
import { bindCallback, Observable } from 'rxjs';
import { Profesor, Registro } from '../models/profesor.models';
@Injectable({
  providedIn: 'root'
})
export class RealtimeFirebaseService {

  private dbProfesores = '/persona';
  private dbRegistros = '/registros';
  private dbCarreras = '/Carreras';
  private dbLaboratorios = '/Laboratorios';

  misLibrosRef: AngularFireList<Profesor[]>;

  constructor(private firestore: AngularFireDatabase) { 
    this.misLibrosRef = firestore.list(this.dbProfesores);
  }

  getProfesores(): AngularFireList<Profesor[]>{
    return this.misLibrosRef; 
  }

  getProfesor(name:string): Observable<Profesor[]>{
    let teacher = this.firestore.list<Profesor>(this.dbProfesores, ref => 
      ref.orderByChild('imagen').equalTo(name)
    ).valueChanges()
    return teacher
  }

  getReporte(filtro: string,valor: string): Observable<Registro[]>{
    let reporte = this.firestore.list<Registro>(this.dbRegistros, ref => 
      ref.orderByChild(filtro).equalTo(valor)
    ).valueChanges()
    return reporte
  }

  getCarreras(){
    return this.firestore.list<string>(this.dbCarreras ).valueChanges()
  }

  getLaboratorios(){
    return this.firestore.list<string>(this.dbLaboratorios ).valueChanges()
  }

  getRespuesta(name: string): Observable<Registro[]>{
    let teacher = this.firestore.list<Registro>(this.dbRegistros, ref => 
      ref.orderByChild('correo').equalTo(name)
    ).valueChanges()
    return teacher
  }

}

