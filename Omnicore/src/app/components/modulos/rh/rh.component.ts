import { Component } from '@angular/core';

@Component({
  selector: 'app-rh',
  templateUrl: './rh.component.html',
  styleUrl: './rh.component.css'
})
export class RhComponent {
  currentDate?: string;


  constructor() {
    
  }
  ngOnInit(): void {
    this.currentDate = this.getFormattedDate();
  }

 

  getFormattedDate(): string {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses son base 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

}
