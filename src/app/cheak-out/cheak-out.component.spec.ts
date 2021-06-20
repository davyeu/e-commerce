import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheakOutComponent } from './cheak-out.component';

describe('CheakOutComponent', () => {
  let component: CheakOutComponent;
  let fixture: ComponentFixture<CheakOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheakOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheakOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
