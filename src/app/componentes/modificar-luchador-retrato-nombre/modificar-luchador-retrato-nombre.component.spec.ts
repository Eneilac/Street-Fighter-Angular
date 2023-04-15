import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarLuchadorRetratoNombreComponent } from './modificar-luchador-retrato-nombre.component';

describe('ModificarLuchadorRetratoNombreComponent', () => {
  let component: ModificarLuchadorRetratoNombreComponent;
  let fixture: ComponentFixture<ModificarLuchadorRetratoNombreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarLuchadorRetratoNombreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarLuchadorRetratoNombreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
