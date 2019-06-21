import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSplitMenuComponent } from './button-split-menu.component';

describe('ButtonSplitMenuComponent', () => {
  let component: ButtonSplitMenuComponent;
  let fixture: ComponentFixture<ButtonSplitMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonSplitMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonSplitMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
