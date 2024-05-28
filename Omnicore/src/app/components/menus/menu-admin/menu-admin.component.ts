import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.css'
})
export class MenuAdminComponent {

  constructor(private router: Router, private localStorageService: LocalStorageService){}

  logOut(){
    this.localStorageService.removeItem('token_admin');
    this.router.navigate(['/signin'])
  }
 
}
