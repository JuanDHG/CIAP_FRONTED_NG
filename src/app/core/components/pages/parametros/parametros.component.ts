import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
    templateUrl: './parametros.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['./parametros.component.scss'],
})



export class ParametrosComponent implements OnInit {
    Permisos: string = localStorage.getItem('dataPermisos');
    steps = [];
    activeIndex: number = 0; // Inicializa la pestaña activa

    constructor(private route: ActivatedRoute) {
        const pm =  JSON.parse(this.Permisos);
        const pmp = pm[1].items[0];
        console.log(pmp);


        if (pmp.label === "Parametros") {
            for (let i = 0; i < pmp.items.length; i++) {
                const e = pmp.items[i];
                this.steps.push({label: e.label});
            }
        }

    }

    ngOnInit() {
        this.route.queryParamMap
        .subscribe((params) => {
          var md = params.get('md')

            if(md){
                  // Si md tiene un valor, intenta establecerlo como activeIndex
                this.activeIndex = this.steps.findIndex(step => step.label === md);
            }else{
                this.activeIndex = 0
            }

             // Si md no se encuentra en los steps, establece el índice predeterminado
            if (this.activeIndex === -1 || this.activeIndex === undefined) {
                this.activeIndex = 0; // Puedes ajustar este valor según tus necesidades

                Swal.fire({
                    title: 'Error',
                    html: `Usted no cuenta con permisos para acceder al modulo de <b>${md} </b>`,
                    icon: 'warning',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#5fbb3a',
                });
            }
    });
    }


  // Función para cambiar el paso al hacer clic en el Steps
  changeTab(index: number) {
    // Cambia la pestaña activa cuando se hace clic en un paso
    this.activeIndex = index;


  }

  onTabChange(event: any) {
    // Puedes agregar lógica adicional cuando cambia la pestaña del p-tabView
    console.log('Pestaña cambiada:', event.index);
  }





}
