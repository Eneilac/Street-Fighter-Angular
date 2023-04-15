import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosVideojuegoComponent } from './usuarios-videojuego.component';

describe('UsuariosVideojuegoComponent', () => {
  let component: UsuariosVideojuegoComponent;
  let fixture: ComponentFixture<UsuariosVideojuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosVideojuegoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosVideojuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
