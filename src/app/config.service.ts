import { Injectable } from '@angular/core';

export interface Config {
  Url: string; 
}

@Injectable({
  providedIn: 'root'
})

export class ConfigService {

  static getConfig(): string {
    return 'https://localhost:44387/api/'; 
  }

  constructor() { }
}
