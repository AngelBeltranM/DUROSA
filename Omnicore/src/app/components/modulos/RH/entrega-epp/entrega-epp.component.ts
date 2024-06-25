import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrega-epp',
  templateUrl: './entrega-epp.component.html',
  styleUrl: './entrega-epp.component.css'
})
export class EntregaEppComponent {
entregaeppHTML?: string;
entregaeppCSS?: string;
currentDate?: string;

  constructor(private http: HttpClient, private router: Router ) {}

  ngOnInit(): void {
    this.loadHTML();
    this.loadCSS();

    this.currentDate = this.getFormattedDate();
  }


  private loadHTML(){
    
    this.http.get('/assets/formatos/entrega-epp/entrega.html', {responseType: 'text'}).subscribe(data => this.entregaeppHTML = data );
    return console.log('formato de entrega cargado');
  }

  private loadCSS() {
    this.http.get('/assets/formatos/entrega-epp/EstilosEntrega.css', {responseType: 'text'}).subscribe(data => {
      this.entregaeppCSS = data;
      return console.log("estilos de formato cargado");
    }) 
  }
    //Boton para regresar al inicio
    regresar() {
      const token = localStorage.getItem('token');
  
      if (!token) {
        this.router.navigate(['/menu-admin']);
      } else {
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
