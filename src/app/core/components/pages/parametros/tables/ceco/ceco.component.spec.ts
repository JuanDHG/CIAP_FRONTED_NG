import { ComponentFixture, TestBed } from '@angular/core/testing';

import { cecoComponent } from './ceco.component';

describe('GerenciaComponent', () => {
  let component: cecoComponent;
  let fixture: ComponentFixture<cecoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [cecoComponent]
    });
    fixture = TestBed.createComponent(cecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
