import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../services/movies.service';

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
    private route:Router
    ) { }

    movie_id: any ;
    movie: any = {};

  ngOnInit(): void {
    //check if the user authenticated or not
    var token = localStorage.getItem('authToken');
    if(token == null || undefined){
      this.route.navigate(['login']);
    }

    this.movie_id = this.activeRoute.snapshot.paramMap.get('id');

    this.movies.getAllMovies().subscribe(
      data => {
        this.movie = data.message.find( (e:any) => e.id == this.movie_id);
        console.log(this.movie)
      }
    )
  }

}
