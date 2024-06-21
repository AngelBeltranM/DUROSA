import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-entrega-epp',
  templateUrl: './entrega-epp.component.html',
  styleUrl: './entrega-epp.component.css'
})
export class EntregaEppComponent {
entregaeppHTML?: string;
entregaeppCSS?: string;

  constructor(private http: HttpClient ) {}

  ngOnInit(): void {
    this.loadHTML();
    this.loadCSS();
  }


  private loadHTML(){
    
    this.http.get('/assets/formatos/entrega-epp/entrega.html', {responseType: 'text'}).subscribe(data => this.entregaeppHTML = data );
    return console.log('formato de entrega cargado');
  }

  private loadCSS() {
    this.http.get('/assets/formatos/entrega-epp/estilosEntrega.html', {responseType: 'text'}).subscribe(data => {
      this.entregaeppCSS = data;
      return console.log("estilos de formato cargado");
    }) 
  }

}
