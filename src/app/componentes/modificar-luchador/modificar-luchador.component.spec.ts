import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarLuchadorComponent } from './modificar-luchador.component';

describe('ModificarLuchadorComponent', () => {
  let component: ModificarLuchadorComponent;
  let fixture: ComponentFixture<ModificarLuchadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarLuchadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarLuchadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
