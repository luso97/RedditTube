import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponentComponent } from './components/inicio-component/inicio-component.component';


const routes: Routes = [
  {path: '',   redirectTo: '/inicio', pathMatch: 'full' },
  {path:'inicio',component:InicioComponentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
