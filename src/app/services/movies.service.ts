import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http:HttpClient) { }

  public _url = 'https://test-api.storexweb.com/api/movies';
  
  public _urlC = 'https://test-api.storexweb.com/api/category';

  movies:any = [];
  categories:any = [];

  getAllMovies():Observable<any>{
    this.movies = this.http.get(this._url);
    return this.movies;
  }

  getAllCategories():Observable<any>{
    this.categories = this.http.get(this._urlC);
    return this.categories;
  }
}
