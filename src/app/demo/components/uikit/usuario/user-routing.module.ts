import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RolesComponent } from './user.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: RolesComponent }
	])],
	exports: [RouterModule]
})
export class TableDemoRoutingModule { }
