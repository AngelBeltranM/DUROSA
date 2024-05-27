import { Component } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { Router } from '@angular/router';
import { Usuarios, Usuarios1 } from '../../Models/ListUsers';
import { Toast, ToastrService } from 'ngx-toastr';


declare var $: any; 
declare var eliminar: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})

export class UsuariosComponent {


  constructor(private apiService: ApiServiceService, private router: Router, private toastr: ToastrService) { }
  
  //Lista para traer y mostrar usuarios en la tabla
  ListaUsuarios: Usuarios1[] = [];
  users = Usuarios;


  //Objeto para registrar un usuario en la base de datos
  user = {
    username: '',
    nombre: '',
    apellido: '',
    email: '',
    password: ''
  }

  obtenerUsuarios(){
    this.apiService.getAllUser().subscribe(data => {
      this.ListaUsuarios = data;
    });
  }

  Registro() {
      this.apiService.SignUp(this.user).subscribe( res => {
        this.toastr.success("Usuario agregado con exito", "Usuario agregado");
        this.obtenerUsuarios();
      }, err => console.log(err))
  }

  eliminarUsuario(id: any)
  {
     this.apiService.DeleteUser(id).subscribe(res => {
     }, error => { 
        console.log(error);
     });
     alert("Usuario Eliminado");
     location.reload();
  }


  ngOnInit(): void {

   this.obtenerUsuarios();
    
  }
}





