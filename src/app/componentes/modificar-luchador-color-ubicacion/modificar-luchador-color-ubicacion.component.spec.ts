import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarLuchadorColorUbicacionComponent } from './modificar-luchador-color-ubicacion.component';

describe('ModificarLuchadorColorUbicacionComponent', () => {
  let component: ModificarLuchadorColorUbicacionComponent;
  let fixture: ComponentFixture<ModificarLuchadorColorUbicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarLuchadorColorUbicacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarLuchadorColorUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
