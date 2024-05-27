import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Usuarios } from '../Models/ListUsers'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {

  private URL = 'http://localhost:3001/api/'

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  //CONSUMO API USUARIOS

  //METODO DEL SERVICIO PARA INICIAR SESION
  signIn(user: any) {
    return this.http.post<any>(this.URL + 'signin', user);
  }
  //METODO DEL SERVICIO PARA AGREGAR UN USUARIOS
  SignUp(user: any) {
    return this.http.post<any>(this.URL + 'signup', user);
  }
  //METODO DEL SERVICIO PARA ELIMINAR UN USUARIO
  DeleteUser(id: string): Observable<any> {
    return this.http.delete<any>(this.URL + 'DeleteUser/' + id);
  }

  EditUser(id:string): Observable<any> {
    return this.http.get(this.URL + 'putUser/' + id);
  }

  //METODO DEL SERVICIO PARA TRAER UN USUARIO
  getAllUser() {
    return this.http.get<any>(this.URL + 'getUser');
  }

  //---------------------------------------------------------
  //CONSUMO API ADMINISTRADORES
  signInAdmin(admin: any) {
    return this.http.post<any>(this.URL + 'sigInAdmin', admin);
  }

  loggedIn() {
    return !!this.localStorageService.getItem('token');

  }

  loggedAdmin() {
    return !!this.localStorageService.getItem('token_admin');

  }



}
