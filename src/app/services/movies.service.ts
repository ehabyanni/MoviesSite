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


  //show all movies
  getAllMovies():Observable<any>{
    return this.http.get(this._url);
  }

  //show movies by category
  getCatMovies(id:any):Observable<any>{
    return  this.http.get(this._url2 + id);
  }

  //post new movie
  createMovie(movie : any):Observable<any>{
    return this.http.post<any>(this._url , movie);
  }

  EditMovie(id:any , movie:any){
    return this.http.put(this._url + "/" + id , movie);
  }

  //delete movie
  // deleteMovie(id : number){
  //   return this.http.delete<any>(this._url + "/" + id);
  // }

}
