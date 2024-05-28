import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(private router: Router,private localStorageService: LocalStorageService) {}
  logOut(){
    this.localStorageService.removeItem('token');
    //localStorage.removeItem('token')
    //localStorage.clear();
    this.router.navigate(['/signin'])
  }
 

}



