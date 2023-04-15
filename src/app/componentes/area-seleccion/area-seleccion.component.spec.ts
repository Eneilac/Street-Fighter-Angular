import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaSeleccionComponent } from './area-seleccion.component';

describe('AreaSeleccionComponent', () => {
  let component: AreaSeleccionComponent;
  let fixture: ComponentFixture<AreaSeleccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaSeleccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaSeleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
