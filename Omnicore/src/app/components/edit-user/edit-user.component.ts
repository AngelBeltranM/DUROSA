import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../../services/api-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuarios, Usuarios1 } from '../../Models/ListUsers';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  UsuarioForm: FormGroup<any>;
  id: string| null;
  ListaUsuarios: Usuarios1[] = [];

  constructor(private aRoute: ActivatedRoute, private apiService: ApiServiceService, private fb: FormBuilder) {

    this.UsuarioForm = this.fb.group({
      username: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required]
    });

    this.id = this.aRoute.snapshot.paramMap.get('id');
    
  }

  ngOnInit() {

  }

  esEditar() {

    if(this.id !== null){

      this.apiService.EditUser(this.id).subscribe(data => {
        this.UsuarioForm.setValue({
          username: data.username,
          nombre: data.nombre,
          apellido: data.apellido,
          email: data.email
        })
      })

    }


  }

}
