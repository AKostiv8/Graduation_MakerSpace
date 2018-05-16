import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DangerousComponent } from './dangerous.component';

describe('DangerousComponent', () => {
  let component: DangerousComponent;
  let fixture: ComponentFixture<DangerousComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DangerousComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DangerousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
