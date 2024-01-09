// interaction.service.ts

import { Injectable, HostListener } from '@angular/core';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root', // Proporcionado en el nivel raíz
})
export class InteractionService {
    constructor(private loginService:LoginService){}
  @HostListener('window:mousemove', ['$event'])
  onUserInteraction(event: MouseEvent) {
    this.loginService.updateExpirationTime();
  }
}
