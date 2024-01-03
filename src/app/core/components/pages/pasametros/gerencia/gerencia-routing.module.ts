import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GerenciaComponent } from './gerencia.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: GerenciaComponent }
	])],
	exports: [RouterModule]
})
export class TableDemoRoutingModule { }
