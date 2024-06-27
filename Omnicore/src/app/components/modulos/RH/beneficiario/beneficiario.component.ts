import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-beneficiario',
  templateUrl: './beneficiario.component.html',
  styleUrl: './beneficiario.component.css'
})
export class BeneficiarioComponent {
  BeneficiariosHTML?: string = '';
 BeneficiariosCSS?: string = '';

constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private location: Location){}

  ngOnInit(): void {
    this.loadBenHTML();
    this.loadBenCSS();
  }

  private loadBenHTML() {
    this.http.get('/assets/formatos/Beneficiario/Beneficiario.html', {responseType: 'text'}).subscribe(data => {
      this.BeneficiariosHTML = data;
    });
  }

  private loadBenCSS() {
    this.http.get('/assets/formatos/Beneficiario/EstilosBen.css', { responseType:'text' }).subscribe(data => {
      this.BeneficiariosCSS = data;
    })
  }

  private setCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const month = monthNames[date.getMonth()];
    const day = ('0' + date.getDate()).slice(-2);
    const currentDate = `${day} de ${month} de ${year}`;
    //document.getElementById('currentDate').innerHTML = currentDate;
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



}
