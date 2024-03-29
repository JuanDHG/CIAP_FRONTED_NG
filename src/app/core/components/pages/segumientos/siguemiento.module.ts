import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import {TooltipModule} from 'primeng/tooltip';
import {SeguimientoRoutingModule} from "./siguemiento-routing.module";
import {SiguemientoComponent} from "./siguemiento.component";
import { DividerModule } from 'primeng/divider';


@NgModule({
	imports: [
		CommonModule,
        SeguimientoRoutingModule,
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
		OverlayPanelModule,
		TooltipModule,
        DividerModule
	],
    declarations: [SiguemientoComponent]
})
export class SeguimientoModule { }
