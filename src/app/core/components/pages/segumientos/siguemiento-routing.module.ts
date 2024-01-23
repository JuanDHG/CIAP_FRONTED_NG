import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SiguemientoComponent } from './siguemiento.component';

@NgModule({
	imports: [RouterModule.forChild([
        { path: '', component: SiguemientoComponent }
	])],
	exports: [RouterModule]
})
export class SeguimientoRoutingModule { }
