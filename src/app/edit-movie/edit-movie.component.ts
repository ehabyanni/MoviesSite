import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})
export class EditMovieComponent implements OnInit {

  constructor(
    private formbuilder: FormBuilder,
    private route: Router,
    private categoryService: CategoriesService,
    private movieService: MoviesService,
    private http: HttpClient,
    private activeRoute: ActivatedRoute,
    private movies: MoviesService,
    private catService: CategoriesService
  ) { }

  movieForm = this.formbuilder.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    category_id: ['', Validators.required]
  })

  //name property
  get NAME() {
    return this.movieForm.get('name');
  }

  //description property
  get DESCRIPTION() {
    return this.movieForm.get('description');
  }

  //category property
  get CATEGORY_ID() {
    return this.movieForm.get('category_id');
  }

  movie_id: any;

  movie: any = {};

  categories: any = [];

  ngOnInit(): void {
    //check if the user authenticated or not
    var token = localStorage.getItem('authToken');
    if (token == null || undefined) {
      this.route.navigate(['/login']);
    }

    this.movie_id = this.activeRoute.snapshot.paramMap.get('id');
    this.movies.getAllMovies().subscribe(
      data => {
        this.movie = data.message.find((e: any) => e.id == this.movie_id);
        //console.log(this.movie);
        this.movieForm.setValue({
          name: this.movie.name,
          description: this.movie.description,
          category_id: this.movie.category_id
        })
      }
    )

    this.catService.getAllCategories().subscribe(
      data => {
        this.categories = data.message;
        //console.log(this.categories);
      }
    )

  }

  //object for storing ediatble Movie Data 
  formDataEdit = new FormData();
  //upload image
  imageUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log(file);
      this.formDataEdit.append('image', file);
      console.log(this.formDataEdit.get('image'));
    }
  }

  //editable Movie Object
  EditMovieData: any = {
    name: "",
    description: "",
    category_id: "",
  };

  //creation
  onEditSubmit() {

    this.formDataEdit.append('name', this.EditMovieData.name);
    this.formDataEdit.append('description', this.EditMovieData.description);
    this.formDataEdit.append('category_id', this.EditMovieData.category_id);
    this.formDataEdit.append('_method', 'put');

    var imageCheck = this.formDataEdit.get('image');
    
    // console.log(this.EditMovieData);
    // console.log(imageCheck);
    
    if(imageCheck != null || undefined){
      // console.log(this.formDataEdit.get('name'));
      // console.log(this.formDataEdit.get('description'));
      // console.log(this.formDataEdit.get('category_id'));
      // console.log(this.formDataEdit.get('image'));

      this.movies.EditMovie(this.movie_id , this.formDataEdit).subscribe(
        () => {
          this.route.navigate(['/home']);
        }
      );
    }
    else{
      console.log('test', this.EditMovieData);
      this.movies.EditMovie(this.movie_id , this.EditMovieData).subscribe(
        () => {
          this.route.navigate(['/home']);
        }
      );
    }
   }


  //cancel
  cancelEdit() {
    this.route.navigate(['movies', this.movie_id]);
  }

}
