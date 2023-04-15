import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarLuchadorAtributosComponent } from './modificar-luchador-atributos.component';

describe('ModificarLuchadorAtributosComponent', () => {
  let component: ModificarLuchadorAtributosComponent;
  let fixture: ComponentFixture<ModificarLuchadorAtributosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarLuchadorAtributosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarLuchadorAtributosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
