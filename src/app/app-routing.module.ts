import { MovieComponent } from './Movie/Movie.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { BookticketComponent } from './bookticket/bookticket.component';
const routes: Routes = [
  {
    path:'',component:LoginComponent
  },
  {
    path:'register',component:RegistrationComponent
  },
  {
    path:'movie',component:MovieComponent
  },
  {
    path:'booking',component:BookticketComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
