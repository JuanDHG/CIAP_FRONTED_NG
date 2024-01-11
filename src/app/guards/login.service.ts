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
    }
  }

  isSessionExpiringSoon(): boolean {
    const currentTime = Date.now();
    const lastTimeReal: any = localStorage.getItem('expirationTime');

    // Verifica si 'expirationTime' está presente en localStorage y no es nulo
    if (lastTimeReal) {
      const expirationTimeInMillis = new Date(lastTimeReal).getTime();
      const timeRemainingInMillis = expirationTimeInMillis - currentTime;
      const threeMinutesInMillis = 3 * 60 * 1000; // 3 minutos en milisegundos

      // Si el tiempo restante es menor o igual a 3 minutos
      if (timeRemainingInMillis <= threeMinutesInMillis) {
        // Si el tiempo ha expirado o es igual al tiempo de la sesión, realiza la limpieza del localStorage
        if (timeRemainingInMillis <= 0) {
          localStorage.clear();
          // Recarga la página
          window.location.reload();
        }
        // Retorna true en ambos casos
        return true;
      } else {
        // Si el tiempo restante es mayor a 3 minutos, retorna false
        return false;
      }
    } else {
      // Manejo adicional si 'expirationTime' no está presente en localStorage
      console.error("No se encontró 'expirationTime' en localStorage");
      return false;
    }
  }


  updateLastInteractionTimestamp() {
    this.lastInteractionTimestamp = Date.now();
  }


}
