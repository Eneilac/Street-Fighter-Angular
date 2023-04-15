import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarLuchadorAnimacionStageComponent } from './modificar-luchador-animacion-stage.component';

describe('ModificarLuchadorAnimacionStageComponent', () => {
  let component: ModificarLuchadorAnimacionStageComponent;
  let fixture: ComponentFixture<ModificarLuchadorAnimacionStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarLuchadorAnimacionStageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarLuchadorAnimacionStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
