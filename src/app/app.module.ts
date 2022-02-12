import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatbotWebComponent } from './chatbot-web/chatbot-web.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { ChatbotResponse } from './chatbot-response';

@NgModule({
  declarations: [
    AppComponent,
    ChatbotWebComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule, 
    BrowserAnimationsModule, 
    MatFormFieldModule, 
    MatInputModule
  ],
  providers: [ChatbotResponse],
  bootstrap: [AppComponent]
})
export class AppModule { }
