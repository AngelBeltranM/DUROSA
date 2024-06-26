import { Component, Renderer2, ElementRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Location } from '@angular/common';

@Component({
  selector: 'app-entrega-epp',
  templateUrl: './entrega-epp.component.html',
  styleUrl: './entrega-epp.component.css'
})
export class EntregaEppComponent {
entregaeppHTML?: string;
entregaeppCSS?: string;
currentDate?: string;
form: FormGroup;

  constructor(private fb: FormBuilder ,private http: HttpClient, private router: Router, private location: Location, private renderer: Renderer2, private el: ElementRef ) {
    this.form = this.fb.group({ 

      Nuevo_Ingreso: [false],
      Planta: [false],
      Anual: [false],
      Reposicion: [false],

      Si: [false],
      No: [false],

      Cam_ligera: [false],
      Res_camisaL : [''],
      
      Cam_gruesa: [false],
      Res_camisaG: [''],

      Zapatos: [false],
      Res_Zapato: [''],

      Lentes: [false],
      Res_lentes: [''],

      Pantalon: [false],
      Res_pantalon: [''],

      Guantes: [false],
      Res_guantes: [''],

      Camiseta : [false],
      Res_camiseta: [''],

      Chaleco_id: [false],
      Res_chaleco: ['']


    });
  }

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

  async createPDF() {

    if(!this.entregaeppHTML || !this.entregaeppCSS) {
      return;
    }

    const filledHTML = this.entregaeppHTML
    
    .replace('{{Nuevo Ingreso}}', this.form.value.Nuevo_Ingreso ? 'Nuevo ingreso': '')
    .replace('{{Planta}}', this.form.value.Planta ? 'Planta' : '')
    .replace('{{Anual}}', this.form.value.Anual ? 'Anual': '')
    .replace('{{Reposicion}}', this.form.value.Reposicion ? 'Reposición': '')
    .replace('{{Si}}', this.form.value.Si ? 'Si': '')
    .replace('{{No}}', this.form.value.No ? 'No' : '')
    
    .replace('{{Cam_ligera}}', this.form.value.Cam_ligera ? 'Aplica' : 'No Aplica')
    .replace('{{Res_camisaL}}', this.form.value.Res_camisaL)

    .replace('{{Cam_gruesa}}', this.form.value.Cam_gruesa ? 'Aplica' : 'No Aplica')
    .replace('{{Res_camisaG}}', this.form.value.Res_camisaG)
    
    .replace('{{Zapatos}}',this.form.value.Zapatos ? 'Aplica':'No Aplica')
    .replace('{{Res_Zapatos}}', this.form.value.Res_Zapato)

    .replace('{{Lentes}}',this.form.value.Lentes ? 'Aplica': 'No Aplica')
    .replace('{{Res_lentes}}',this.form.value.Res_lentes)

    .replace('{{Pantalon}}',this.form.value.Pantalon ? 'Aplica': 'No Aplica')
    .replace('{{Res_Pantalon}}',this.form.value.Res_pantalon)

    .replace('{{Guantes}}',this.form.value.Guantes ? 'Aplica': 'No Aplica')
    .replace('{{Res_guantes}}',this.form.value.Res_guantes)

    .replace('{{Camiseta}}',this.form.value.Camiseta ? 'Aplica': 'No Aplica')
    .replace('{{Res_camiseta}}',this.form.value.Res_camiseta)

    .replace('{{Chaleco_id}}',this.form.value.Chaleco_id ? 'Aplica': 'No Aplica')
    .replace('{{Res_chaleco}}',this.form.value.Res_chaleco);

    const pdfContent = document.createElement('div');
    pdfContent.innerHTML = filledHTML;
    const style = document.createElement('style');
    style.innerHTML = this.entregaeppCSS;
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

    const canvasWidthMM = canvas.width / 96; // 96 PPI es el estándar de los monitores
    const canvasHeightMM = canvas.height / 96;

    // Redimensionar la imagen para que se ajuste al tamaño de la página del PDF y centrarla
     const canvasWidth = canvas.width;
     const canvasHeight = canvas.height;
     
     const ratio = Math.min(pdfWidth / canvasWidthMM, pdfHeight / canvasHeightMM);
 
     const imgWidth = canvasWidthMM * ratio;
     const imgHeight = canvasHeightMM * ratio;

    const marginLeft = (pdfWidth - imgWidth) / 2;
    const marginTop = (pdfHeight - imgHeight) / 2;

    pdf.addImage(imgData, 'JPEG', marginLeft, marginTop, imgWidth, imgHeight);

    return pdf;

  }

  async generatePdf() {
    const pdf = await this.createPDF();
    pdf?.save("EntregaEpp.pdf");
    this.location.go(this.location.path());
    window.location.reload();
  }


}
