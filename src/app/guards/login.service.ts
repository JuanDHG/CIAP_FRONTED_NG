// login.service.ts

import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

  private _isAuthenticated: boolean = false;
  private lastInteractionTimestamp: number = Date.now();

  isAuthenticated(): boolean {
    const expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime && new Date() < new Date(expirationTime)) {
      return true;
    }
    return false;
  }



  setAuthenticated(value: boolean, expirationHours: number = 1) {
    this._isAuthenticated = value;

    if (value) {
      const expirationTime = new Date();
      expirationTime.setHours(expirationTime.getHours() + expirationHours);
      localStorage.setItem('expirationTime', expirationTime.toString());
    } else {
      localStorage.removeItem('expirationTime');
    }
  }

  updateExpirationTime() {
    const isAuthenticated = this.isAuthenticated();
    if (isAuthenticated) {
      this.setAuthenticated(true); // Actualiza la marca de tiempo de expiración
      console.log('actulizado');
      
    }
  }


  isSessionExpiringSoon(): boolean {
    const currentTime = Date.now();
    const sessionDuration = currentTime - this.lastInteractionTimestamp;
    const threeMinutesInMillis = 3 * 60 * 1000; // 3 minutos en milisegundos

    return sessionDuration >= threeMinutesInMillis;
  }

  updateLastInteractionTimestamp() {
    this.lastInteractionTimestamp = Date.now();
  }


}
