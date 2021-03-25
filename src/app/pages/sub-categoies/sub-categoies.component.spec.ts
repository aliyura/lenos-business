import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoiesComponent } from './sub-categoies.component';

describe('SubCategoiesComponent', () => {
  let component: SubCategoiesComponent;
  let fixture: ComponentFixture<SubCategoiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubCategoiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategoiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
