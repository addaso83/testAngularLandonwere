import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CrudComponent} from '../app/crud/crud.component';
import { CreateComponent } from './crud/create.component';
import { EditComponent } from './crud/edit.component'


const routes: Routes = [
  {path: '',redirectTo: 'crud',pathMatch: 'full'},
  { path: 'crud', component: CrudComponent },
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
