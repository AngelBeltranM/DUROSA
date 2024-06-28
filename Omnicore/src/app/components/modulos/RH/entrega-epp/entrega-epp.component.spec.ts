import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaEppComponent } from './entrega-epp.component';

describe('EntregaEppComponent', () => {
  let component: EntregaEppComponent;
  let fixture: ComponentFixture<EntregaEppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntregaEppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntregaEppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
