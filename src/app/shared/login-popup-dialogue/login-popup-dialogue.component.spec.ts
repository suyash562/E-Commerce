import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPopupDialogueComponent } from './login-popup-dialogue.component';

describe('LoginPopupDialogueComponent', () => {
  let component: LoginPopupDialogueComponent;
  let fixture: ComponentFixture<LoginPopupDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPopupDialogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPopupDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
