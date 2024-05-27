import { Component } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-sign-admin',
  templateUrl: './sign-admin.component.html',
  styleUrl: './sign-admin.component.css'
})
export class SignAdminComponent {

  constructor(private router: Router, private apiS: ApiServiceService, private localStorageService: LocalStorageService) {

    const admin = localStorageService.getItem('token_admin');
    //const admin = localStorage.getItem('token_admin');
    if(admin){
      this.router.navigate(['/menu-admin'])
    }

   }

  admin = {
    username: '',
    password: ''
  }

  signIn(){

    this.apiS.signInAdmin(this.admin).subscribe(res => {
      console.log(res);
      this.localStorageService.setItem('token_admin', res.token_admin);
      //localStorage.setItem('token_admin', res.token_admin);
      this.router.navigate(['/menu-admin']);
    }, err => {
      alert("Usuario o contraseña son invalidas.")
      return console.warn(err);
  
  });
  }

}
