import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { MoviesService } from '../services/movies.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private route: Router , 
    private http:HttpClient , 
    private movies:MoviesService,
    private categories:CategoriesService
    ) { }

  allMovies: any = [];
  allCategories: any = [];

  ngOnInit(): void {
    //check if the user authenticated or not
    var token = localStorage.getItem('authToken');
    if(token == null || undefined){
      this.route.navigate(['login']);
    }

    //get all movies
    this.movies.getAllMovies().subscribe(
      data => {
        this.allMovies = data.message;
        console.log(this.allMovies);
      }
    )

    //get all categories
    this.categories.getAllCategories().subscribe(
      dataCAt => {
        this.allCategories = dataCAt.message;
        console.log(this.allCategories);
      }
    )
  }

  //movie page
  goToMovieDetails(id : any){
    this.route.navigate(['movies', id]);
  }

  //log out
  logOut() {
    console.log('bye');
    localStorage.clear();
    this.route.navigate(['login']);
  }

}
