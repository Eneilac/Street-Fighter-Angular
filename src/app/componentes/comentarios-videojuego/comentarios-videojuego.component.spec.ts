import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariosVideojuegoComponent } from './comentarios-videojuego.component';

describe('ComentariosVideojuegoComponent', () => {
  let component: ComentariosVideojuegoComponent;
  let fixture: ComponentFixture<ComentariosVideojuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComentariosVideojuegoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComentariosVideojuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
