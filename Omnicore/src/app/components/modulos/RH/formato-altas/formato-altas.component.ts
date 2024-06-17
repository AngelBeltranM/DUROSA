import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-formato-altas',
  templateUrl: './formato-altas.component.html',
  styleUrl: './formato-altas.component.css'
})
export class FormatoAltasComponent {
  currentDate?: string;
  form: FormGroup;

  pdfSrc: string | null = null;
  AltaEmpleadoHTML: string = '';
  AltaEmpleadoCSS: string = '';
  img: string = '';

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, private location: Location, private renderer: Renderer2, private el: ElementRef) {

    this.form = this.fb.group({
      NOMBRE: [''],
      PUESTO: [''],
      DIRECCION: [''],
      TELEFONO_CASA: [''],
      CELULAR: [''],
      TELEFONO_RECADOS: [''],
      EMAIL: [''],
      FECHA_NACIMIENTO: [''],
      IMSS: [''],
      CLINICA: [''],
      CURP: [''],
      RFC: [''],
      ESTADO_CIVIL: [''],
      //DATOS DE LOS HIJOS
      NOMBRE_HIJO1: [''],
      FECHA_NACIMIENTO1: [''],
      NOMBRE_HIJO2: [''],
      FECHA_NACIMIENTO2: [''],
      NOMBRE_HIJO3: [''],
      FECHA_NACIMIENTO3: [''],
      DESCUENTO: [''],
      FOLIO: [''],
      GRUPO_SANGUINEO: [''],
      ALERGIAS: [''],
      PADECIMIENTOS: [''],
      NOMBRE_EMERGENCIA: [''],
      TELEFONO_EMERGENCIA: [''],
      TALLA_PLAYERA: [''],
      TALLA_PANTALON: [''],
      TALLA_ZAPATO: [''],
      DESCUENTO_in: [false],
      VSM: [false]
    });

  }

  ngOnInit(): void {
    this.currentDate = this.getFormattedDate();

    this.loadHtml();
    this.loadCSS();

  }

  private loadHtml() {
    this.http.get('/assets/formatos/altaEmpleados/formatoAlta.html', { responseType: 'text' }).subscribe(data => {
      this.AltaEmpleadoHTML = data
      console.log("formato cargado")
    });
  }

  private loadCSS() {
    this.http.get('/assets/formatos/altaEmpleados/formatoAlta.css', { responseType: 'text' }).subscribe(data => {
      this.AltaEmpleadoCSS = data;
      console.log("Archivo de estilos cargado");
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

  //traer fecha
  getFormattedDate(): string {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses son base 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  async generatePDF() {
    const pdf = await this.createPDF();
    pdf?.save("formato.pdf");
    this.location.go(this.location.path());
    window.location.reload();
  }

  async previewPDF() {
    const pdf = await this.createPDF();
    const pdfData = pdf?.output('datauristring');
    const iframe = this.el.nativeElement.querySelector('#pdfPreviewIframe');
    iframe.src = pdfData;
  }



  async createPDF() {

    if (!this.AltaEmpleadoHTML || !this.AltaEmpleadoCSS) {
      return;
    }

    const filledHTML = this.AltaEmpleadoHTML
      .replace('{{Nombre}}', this.form.value.NOMBRE)
      .replace('{{Puesto}}', this.form.value.PUESTO)
      .replace('{{Dirección}}', this.form.value.DIRECCION)
      .replace('{{Telefono_casa}}', this.form.value.TELEFONO_CASA)
      .replace('{{Celular}}', this.form.value.CELULAR)
      .replace('{{Telefono_recados}}', this.form.value.TELEFONO_RECADOS)
      .replace('{{email}}', this.form.value.EMAIL)
      .replace('{{estado_civil}}', this.form.value.ESTADO_CIVIL)
      .replace('{{fecha_nacimiento}}', this.form.value.FECHA_NACIMIENTO)
      .replace('{{Clinica}}', this.form.value.CLINICA)
      .replace('{{IMSS}}', this.form.value.IMSS)
      .replace('{{CURP}}', this.form.value.CURP)
      .replace('{{RFC}}', this.form.value.RFC)
      .replace('{{nombre_hijo1}}', this.form.value.NOMBRE_HIJO1)
      .replace('{{fecha_nacimiento1}}', this.form.value.FECHA_NACIMIENTO1)
      .replace('{{nombre_hijo2}}', this.form.value.NOMBRE_HIJO2)
      .replace('{{fecha_nacimiento2}}', this.form.value.FECHA_NACIMIENTO2)
      .replace('{{nombre_hijo3}}', this.form.value.NOMBRE_HIJO3)
      .replace('{{fecha_nacimiento3}}', this.form.value.FECHA_NACIMIENTO3)
      .replace('{{Descuento}}', this.form.value.DESCUENTO)
      .replace('{{folio}}', this.form.value.FOLIO)
      .replace('{{Grupo_Sanguineo}}', this.form.value.GRUPO_SANGUINEO)
      .replace('{{Alergias}}', this.form.value.ALERGIAS)
      .replace('{{Padecimientos}}', this.form.value.PADECIMIENTOS)
      .replace('{{talla_playera}}', this.form.value.TALLA_PLAYERA)
      .replace('{{talla_pantalon}}', this.form.value.TALLA_PANTALON)
      .replace('{{talla_zapatos}}', this.form.value.TALLA_ZAPATO)
      .replace('{{DESCUENTO_in}}', this.form.value.DESCUENTO_in ? 'Descuento aplicado' : 'Sin descuento')
      .replace('{{VSM}}', this.form.value.VSM ? 'VSM aplicado' : 'Sin VSM');

    const pdfContent = document.createElement('div');
    pdfContent.innerHTML = filledHTML;
    const style = document.createElement('style');
    style.innerHTML = this.AltaEmpleadoCSS;
    pdfContent.appendChild(style);

    document.body.appendChild(pdfContent);

    const canvas = await html2canvas(pdfContent, { scale: 3, useCORS: true });
    const imgData = canvas.toDataURL('image/jpeg', 0.7);

    const pdf = new jsPDF({
      orientation: 'portrait',  // Orientación del papel: 'portrait' (vertical) o 'landscape' (horizontal)
      unit: 'in',               // Unidad de medida: 'mm', 'cm', 'in', 'px'
      format: 'letter'          // Tamaño del papel: 'letter' (tamaño carta)
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();


    // Redimensionar la imagen para que se ajuste al tamaño de la página del PDF y centrarla
     const canvasWidth = canvas.width;
     const canvasHeight = canvas.height;
     const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);
 
     const imgWidth = canvasWidth * ratio;
     const imgHeight = canvasHeight * ratio;

    const marginLeft = (pdfWidth - imgWidth) / 2;
    const marginTop = (pdfHeight - imgHeight) / 2;

    pdf.addImage(imgData, 'JPEG', marginLeft, marginTop, imgWidth, imgHeight);

    return pdf;
  }
}


