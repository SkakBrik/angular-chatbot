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
            param = 'tools/' + msg;
        } else {
            param = 'greetings/angryGoodbye';
        }
        console.log(param); 
        return param; 
    }

    GetToolResponse(response: string): string {
        let returnValue: string = '';
        let jsonObj: any = JSON.parse(response); 
        let tool: Tool = <Tool>jsonObj; 
        if (tool.stock > 0) {
            if (response.includes('stock') || response.includes('many')) {
                returnValue = 'Currently we have ' + tool.stock + ' ' + tool.tool + ' in stock for the low price of ' + tool.price + ' per ' + tool.tool + '! Buy now at ' + tool.url;
            } else {
                returnValue = 'You can get our ' + tool.tool + ' for only ' + tool.price + '! Buy now at ' + tool.url;
            }
        } else {
            returnValue = 'I\'m sorry! Currently we do not have any ' + tool.tool + ' in stock.'
        }
        return returnValue; 
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

export interface Tool {
    tool: string, 
    url: string, 
    price: number, 
    stock: number
  }
