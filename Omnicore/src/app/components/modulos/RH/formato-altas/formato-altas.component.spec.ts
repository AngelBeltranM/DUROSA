import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatoAltasComponent } from './formato-altas.component';

describe('FormatoAltasComponent', () => {
  let component: FormatoAltasComponent;
  let fixture: ComponentFixture<FormatoAltasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormatoAltasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormatoAltasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
