import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  public _url = 'https://test-api.storexweb.com/api/category';

  //categories:any = [];

  getAllCategories(): Observable<any> {

    return this.http.get(this._url);

  }

  getSingleCategory(id: number): Observable<any> {
    return this.http.get(this._url + `/${id}`)
  }
}
