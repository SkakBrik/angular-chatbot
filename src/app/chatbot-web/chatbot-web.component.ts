import { getLocaleDateFormat } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ChatbotResponse } from '../chatbot-response';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-chatbot-web',
  templateUrl: './chatbot-web.component.html',
  styleUrls: ['./chatbot-web.component.css']
})
export class ChatbotWebComponent implements OnInit {

  chatHistory = this.fb.group ({
    items: this.fb.array([])
  })

  custumerMsg = new FormControl(''); 
  msg: string; 

  constructor(private httpClient: HttpClient, private fb: FormBuilder, private chatbotResponse: ChatbotResponse) { 
    this.msg = '';
  }

  ngOnInit(): void {
    this.httpClient.get<string>(ConfigService.getConfig() + 'greetings/hello')
    .subscribe(
      response => {
        const item = this.fb.group ({
        msg: response,
        speaker: 'Chatbot'
        });
        this.items.push(item); },
      error => console.log(error)
    )

    this.custumerMsg.valueChanges.subscribe(input => {this.msg = input});
  }

  send():void {
    const item = new FormControl({
      msg: this.msg, 
      speaker: 'You'
    });
    this.items.push(item); 
    this.makeResponse(); 
    this.custumerMsg.setValue('');
  }

  makeResponse(): void {
    this.chatbotResponse.GetResponse(this.msg).subscribe(response => 
      {
        let chatbotMsg = response; 
        if (response.includes('tool')) {
          chatbotMsg = this.chatbotResponse.GetToolResponse(response); 
        }
        const item = new FormControl({
          msg: chatbotMsg, 
          speaker: 'Chatbot'
      }); 
      this.items.push(item); 
    })
  }

  get items() {
    return this.chatHistory.controls["items"] as FormArray;
  }

}

export interface ChatItem {
  msg: string; 
  speaker: string; 
}


