import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LucharLuchadoresComponent } from './luchar-luchadores.component';

describe('LucharLuchadoresComponent', () => {
  let component: LucharLuchadoresComponent;
  let fixture: ComponentFixture<LucharLuchadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LucharLuchadoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LucharLuchadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
