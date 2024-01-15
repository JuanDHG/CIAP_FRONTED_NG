import { ComponentFixture, TestBed } from '@angular/core/testing';

import { clienteComponent } from './cliente.component';

describe('GerenciaComponent', () => {
  let component: clienteComponent;
  let fixture: ComponentFixture<clienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [clienteComponent]
    });
    fixture = TestBed.createComponent(clienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
