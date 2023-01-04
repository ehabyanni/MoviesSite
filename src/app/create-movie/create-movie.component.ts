import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss']
})
export class CreateMovieComponent implements OnInit {

  constructor(
    private formbuilder: FormBuilder,
    private route: Router,
    private categoryService: CategoriesService,
    private movieService: MoviesService,
    private http: HttpClient,
  ) { }

  NewMovieForm = this.formbuilder.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    category_id: ['', Validators.required]
  })

  //name property
  get NAME() {
    return this.NewMovieForm.get('name');
  }

  //description property
  get DESCRIPTION() {
    return this.NewMovieForm.get('description');
  }

  //category property
  get CATEGORY_ID() {
    return this.NewMovieForm.get('category_id');
  }



  categories: any = [];

  movie: any = {};

  ngOnInit(): void {
    //check if the user authenticated or not
    var token = localStorage.getItem('authToken');
    if (token == null || undefined) {
      this.route.navigate(['/login']);
    }

    //get categories
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.categories = data.message;
      }
    )
  }


  //object for storing New Movie Data 
  formData = new FormData();

  //upload image
  imageUpload(event: any) {
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      // console.log(file);
      this.formData.append('image', file);
    }
  }

  //New Movie Object
  newMovieData:any = {
    name : "",
    description: "",
    category_id : "",
  };


  //creation
  onSubmit() {
    this.formData.append('name' , this.newMovieData.name);
    this.formData.append('description' , this.newMovieData.description);
    this.formData.append('category_id' , this.newMovieData.category_id);

    this.http.post('https://test-api.storexweb.com/api/movies', this.formData).subscribe(
      () => {
        this.route.navigate(['/home']);
      }
    );
  }

}
