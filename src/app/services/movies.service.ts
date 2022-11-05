import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http:HttpClient) { }

  public _url  = 'https://test-api.storexweb.com/api/movies';

  public _url2 = 'https://test-api.storexweb.com/api/moviesByCategory/';
  
  movies:any = [];

  newMovie:any = {};

  //show all movies
  getAllMovies():Observable<any>{
    this.movies = this.http.get(this._url);
    return this.movies;
  }

  //show movies by category
  getCatMovies(id:any):Observable<any>{
    this.movies = this.http.get(this._url2 + id);
    return this.movies;
  }

  //post new movie
  createMovie(movie : any):Observable<any>{
    this.newMovie = this.http.post<any>(this._url , movie);
    return this.newMovie
  }

}
