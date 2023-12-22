import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    
    constructor(private primengConfig: PrimeNGConfig) { }

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

    }


}
