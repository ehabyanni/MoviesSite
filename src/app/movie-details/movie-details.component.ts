import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { CategoriesService } from '../services/categories.service';
import { HtmlParser } from '@angular/compiler';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private movies: MoviesService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private catService: CategoriesService
  ) { }

  movie_id: any;

  movie: any = {};

  category_id: any = {};

  ngOnInit(): void {
    window.scrollTo(0, 0);
    //check if the user authenticated or not
    var token = localStorage.getItem('authToken');
    if (token == null || undefined) {
      this.route.navigate(['/login']);
    }

    this.movie_id = this.activeRoute.snapshot.paramMap.get('id');

    this.movies.getAllMovies().subscribe(
      data => {
        this.movie = data.message.find((e: any) => e.id == this.movie_id);
        //get category name
        this.catService.getSingleCategory(this.movie.category_id).subscribe(
          dataID => {
            this.category_id = dataID.message;
          }
        )
      }
    )

  }


  //Edit Movie
  movieEditor() {
    this.route.navigate(['edit-movie', this.movie.id]);
  }

  //delete Movie
  deleteMovie() {
    console.log(this.movie_id)
    this.movies.deleteMovie(this.movie_id).subscribe(
      () => {
        this.route.navigate(['/home']);
      }
    );
  }

}
