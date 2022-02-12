import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { waitForAsync } from "@angular/core/testing";
import { delay, mergeWith, Observable } from "rxjs";
import { ConfigService } from "./config.service";

@Injectable()
export class ChatbotResponse {

    returnValue: string; 
    constructor(private httpClient: HttpClient) {
        this.returnValue = '';
    }

    GetResponse(msg:string): Observable<string> {
        
        return this.httpClient.get<string>(ConfigService.getConfig() + this.GetParam(msg)); 
    }

    GetParam(msg:string):string {
        let param = ''; 
        if (this.IsGreeting(msg)) {
            param = 'greetings/hello';
        } else if (this.IsGoodbye(msg)) {
            param = 'greetings/goodbye';
        } else if (this.IsTool(msg)) {
            param = 'tool/msg';
        } else {
            param = 'greetings/angryGoodbye';
        }
        return param; 
    }

    IsTool(msg: string) {
        if (msg.toLowerCase().includes('hammer') || msg.toLowerCase().includes('screwdriver')) {
            return true; 
        }    
        return false; 
    }

    IsGoodbye(msg: string): boolean {
        if (msg.toLowerCase() == 'bye' || msg.toLowerCase() == 'goodbye') {
            return true; 
        }
        return false; 
    }

    IsGreeting(msg: string): boolean {
        if (msg.toLowerCase() == 'hello' || msg.toLowerCase() == 'hey') {
            return true; 
        }
        return false; 
    }
}
