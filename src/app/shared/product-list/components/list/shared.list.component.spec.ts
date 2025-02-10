import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedListComponent } from './shared.list.component';

describe('ListComponent', () => {
  let component: SharedListComponent;
  let fixture: ComponentFixture<SharedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SharedListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
