import { Component, HostListener, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { InteractionService } from './guards/interaction.service';
import { LoginService } from './guards/login.service';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    
    constructor(private primengConfig: PrimeNGConfig,
                private interactionService: InteractionService,
                private loginService: LoginService
                ) { }

    ngOnInit() {
        this.primengConfig.ripple = true;

        this.primengConfig.setTranslation({

                startsWith: 'Empieza con',
                contains: 'Contiene',
                notContains: 'No contiene',
                endsWith: 'Acaba en',
                equals: 'Igual',
                notEquals: 'No igual',
                noFilter: 'Sin filtro',
                lt: 'Menor que',
                matchAll: 'Coincidir con todos',
                matchAny: 'coincide con cualquiera',
                apply: 'Aplicar',
                cancel: 'Cancelar',
                accept: 'Aceptar',
                addRule: 'Añadir Regla',
                removeRule: 'Remover Regla',
                after: 'Después',
                before: 'Antes',
                choose: 'Elegir',
                clear: 'Limpiar'
        });

            // Inicia un temporizador para verificar la expiración de la sesión cada minuto
            setInterval(() => {
                if (this.loginService.isSessionExpiringSoon()) {
                // Muestra la notificación al usuario
                console.log('timeaot => ',this.loginService.isSessionExpiringSoon());
                
                this.showSessionExpiringAlert();
                }else{
                console.log('timeaot => ',this.loginService.isSessionExpiringSoon());

                }
            }, 60000); // Verifica cada minuto (ajusta según tus necesidades)
            
  
    }

    @HostListener('window:mousemove', ['$event'])
    onUserInteraction(event: MouseEvent) {
      this.interactionService.onUserInteraction(event);
    }

    private showSessionExpiringAlert() {
        Swal.fire({
          title: '¡Atención!',
          text: 'Tu sesión expirará en 3 minutos. ¿Deseas extenderla por una hora más?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#5fbb3a',
          cancelButtonText: 'Cerrar',
          timer: 5000,
          timerProgressBar: true,
        }).then((result) => {
          if (result.value) {
            // El usuario hizo clic en "Aceptar", extiende la sesión
            this.extendSession();
          }
        });
      }
      
      private extendSession() {
        // Actualiza la marca de tiempo de la última interacción
        this.loginService.updateLastInteractionTimestamp();
        
        // Puedes realizar otras acciones necesarias para extender la sesión
        // En este ejemplo, simplemente mostramos un mensaje de éxito
        Swal.fire('¡Sesión extendida!', 'Tu sesión ha sido extendida por una hora más.', 'success');
      }

}
