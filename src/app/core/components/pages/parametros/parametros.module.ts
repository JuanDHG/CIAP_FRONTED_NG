import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParametrosComponent } from './parametros.component';
import { ParametrosRoutingModule } from './parametros-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { TabViewModule } from 'primeng/tabview';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { TooltipModule } from 'primeng/tooltip';
import { StepsModule } from 'primeng/steps';
import { ChipsModule } from 'primeng/chips';
import { OverlayPanelModule } from 'primeng/overlaypanel';

//Modulos
import { DireccionComponent } from './tables/direccion/direccion.component';
import { cecoComponent } from './tables/ceco/ceco.component';
import { GerenciaComponent } from './tables/gerencia/gerencia.component';
import { clienteComponent } from './tables/cliente/cliente.component';
import { estadoComponent } from './tables/estado/estado.component';

@NgModule({
    imports: [
        CommonModule,
        ParametrosRoutingModule,
        FormsModule,
        TableModule,
        RatingModule,
        ButtonModule,
        SliderModule,
        InputTextModule,
        ToggleButtonModule,
        RippleModule,
        MultiSelectModule,
        DropdownModule,
        ProgressBarModule,
        ToastModule,
        TabViewModule,
        InputSwitchModule,
        DialogModule,
        MessagesModule,
        MessageModule,
        AvatarModule,
        AvatarGroupModule,
        TooltipModule,
        StepsModule,
        OverlayPanelModule,
        ChipsModule
    ],
    declarations: [ParametrosComponent, GerenciaComponent, DireccionComponent, cecoComponent, clienteComponent, estadoComponent],
})
export class gerenciaModule {}
