import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirLuchadorComponent } from './anadir-luchador.component';

describe('AnadirLuchadorComponent', () => {
  let component: AnadirLuchadorComponent;
  let fixture: ComponentFixture<AnadirLuchadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnadirLuchadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnadirLuchadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
