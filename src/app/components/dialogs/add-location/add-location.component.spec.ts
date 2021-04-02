import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLocationModalDialog } from './add-location.component';

describe('AddCategoryComponent', () => {
  let component: AddLocationModalDialog;
  let fixture: ComponentFixture<AddLocationModalDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddLocationModalDialog],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLocationModalDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
