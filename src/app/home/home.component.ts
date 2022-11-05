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
    private route: Router,
    private http: HttpClient,
    private movies: MoviesService,
    private categories: CategoriesService
  ) { }

  allMovies: any = [];
  allCategories: any = [];

  CategoryMovies: any = [];

  category_id: any;

  ngOnInit(): void {
    //check if the user authenticated or not
    var token = localStorage.getItem('authToken');
    if (token == null || undefined) {
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

  getCatID(id: any) {
    this.categories.getAllCategories().subscribe(
      data => {
        this.category_id = data.message.find((c: any) => c.id == this.category_id);
        console.log(this.category_id);
      }
    )
  }

  //show by category
  showCategory(event: any) {
    var categorySelected = event.target.value;
    //console.log(categorySelected);
    if (categorySelected === 'all'){
      //show all movies
      this.movies.getAllMovies().subscribe(
        dataMovies => {
          this.allMovies = dataMovies.message;
          console.log(this.allMovies);
        }
      )
    }
    else if (categorySelected != null || undefined) {
        this.movies.getCatMovies(categorySelected).subscribe(
          data => {
            this.allMovies = data.message;
            console.log(this.allMovies);
          }
        )
    }
  }

  //movie page
  goToMovieDetails(id: any) {
    this.route.navigate(['movies', id]);
  }

}
