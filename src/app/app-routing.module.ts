import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMovieComponent } from './create-movie/create-movie.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: ''                , component:HomeComponent},
  {path: "login"           , component:LoginComponent},
  {path: "register"        , component:RegisterComponent},
  {path: "home"            , component:HomeComponent},
  {path: "movies/:id"      , component:MovieDetailsComponent},
  {path: "new-movie"       , component:CreateMovieComponent},
  {path: "edit-movie/:id"  , component: EditMovieComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
