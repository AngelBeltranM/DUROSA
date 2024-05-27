import { Component } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})

export class SigninComponent {

  constructor(private apiservice: ApiServiceService, private router: Router, private localStorageService: LocalStorageService) {

    //const user = localStorage.getItem('token');
    const user = localStorageService.getItem('token');
    if (user) {
      this.router.navigate(['/menu']);
    }

  }

  user = {
    email: '',
    password: ''
  }

  signIn() {

    this.apiservice.signIn(this.user).subscribe(res => {

      console.log(res);
      //localStorage.setItem('token', res.token);
      this.localStorageService.setItem('token', res.token);
      this.router.navigate(['/menu']);


    }, err => alert("Correo o contraseña son invalidas"));

  }



}
