import { ComponentFixture, TestBed } from '@angular/core/testing';

import { estadoComponent } from './estado.component';

describe('GerenciaComponent', () => {
  let component: estadoComponent;
  let fixture: ComponentFixture<estadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [estadoComponent]
    });
    fixture = TestBed.createComponent(estadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
