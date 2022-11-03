import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from '../services/movies.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private route: Router , private http:HttpClient , private movies:MoviesService) { }

  allMovies: any = [];
  allCategories: any = [];
  movie: any = [];

  ngOnInit(): void {
    var token = localStorage.getItem('authToken');
    if(token == null || undefined){
      this.route.navigate(['login']);
    }

    this.movies.getAllMovies().subscribe(
      data => {
        this.allMovies = data.message;
        console.log(this.allMovies);
      }
    )

    this.movies.getAllCategories().subscribe(
      dataCAt => {
        this.allCategories = dataCAt.message;
        console.log(this.allCategories);
      }
    )
  }

  logOut() {
    console.log('bye');
    localStorage.clear();
    this.route.navigate(['login']);
  }

}
