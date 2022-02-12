import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotWebComponent } from './chatbot-web.component';

describe('ChatbotWebComponent', () => {
  let component: ChatbotWebComponent;
  let fixture: ComponentFixture<ChatbotWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatbotWebComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
