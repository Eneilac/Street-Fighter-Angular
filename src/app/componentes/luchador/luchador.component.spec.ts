import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuchadorComponent } from './luchador.component';

describe('LuchadorComponent', () => {
  let component: LuchadorComponent;
  let fixture: ComponentFixture<LuchadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuchadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuchadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
