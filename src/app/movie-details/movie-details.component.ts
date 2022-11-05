import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private movies:MoviesService,
    private activeRoute:ActivatedRoute,
    private route:Router,
    private catService:CategoriesService
    ) { }

    movie_id: any ;

    movie: any = {};

    category_id:any = {};

  ngOnInit(): void {
    //check if the user authenticated or not
    var token = localStorage.getItem('authToken');
    if(token == null || undefined){
      this.route.navigate(['/login']);
    }

    this.movie_id = this.activeRoute.snapshot.paramMap.get('id');

    this.movies.getAllMovies().subscribe(
      data => {
        this.movie = data.message.find( (e:any) => e.id == this.movie_id);
        //console.log(this.movie)
      }
    )

    this.catService.getAllCategories().subscribe(
      data => {
        this.category_id = data.message.find( (c:any) => c.id == this.movie.category_id);
        console.log(this.movie);
        //console.log(this.category_id);
      }
    )
    
  }


  //Edit Movie
  movieEditor(){
    //console.log(this.movie.id);
    this.route.navigate(['edit-movie', this.movie.id]);
  }

  //delete Movie
  deleteMovie(){
    //this.movies.deleteMovie(this.movie.id);
    //window.open('/home' , '_self')
    console.log(this.movie.id);
  }

}
