import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-formato-altas',
  templateUrl: './formato-altas.component.html',
  styleUrl: './formato-altas.component.css'
})
export class FormatoAltasComponent {
  currentDate?: string;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentDate = this.getFormattedDate();
  }

  regresar() {
    const token = localStorage.getItem('token');

    if(!token){
      this.router.navigate(['/menu-admin']);
    }else {
      this.router.navigate(['/menu']);
    }
  }

  getFormattedDate(): string {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses son base 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }


}


