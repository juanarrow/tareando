import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})
export class LocaleService {

  //Chosse Locale From This Link
  //https://github.com/angular/angular/tree/master/packages/common/locales
  constructor() { }

  private _locale: string;

  set locale(value: string) {
    this._locale = value;
  }
  get locale(): string {
    return this._locale || 'en-US';
  }

  public registerCulture(culture: string) {
    if (!culture) {
      return;
    }
    switch (culture) {
      case 'es':
      case 'es-es':
        this._locale = 'es-es';
        console.log('Application Culture Set to Spanish');
        break;   
      
      case 'en-us':
        this._locale = 'en-us';
        console.log('Application Culture Set to English');
          break;
      case 'gb':
      case 'en':
      case 'en-uk': 
        this._locale = 'en-uk';
        console.log('Application Culture Set to English');
        break;
      
      default: {
        this._locale = 'en-uk';
        console.log('Application Culture Set to English');
        break;
      }
    }
  }
}