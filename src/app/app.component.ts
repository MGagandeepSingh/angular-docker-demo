import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Movie } from './movie';
import { MoviesService } from './movies.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayError: boolean = false;
  errorMessage: string = '';
  form: FormGroup;
  movies: Movie[];
  movieData: Movie = new Movie();

  constructor(private moviesService: MoviesService, public fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      description: ['']
    });
  }

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.moviesService
      .getMovies()
      .subscribe(
        data => (this.movies = data),
        error => console.log('Error fetching data', error)
      );
  }

  submitForm() {
    this.movieData.name = this.form.get('name').value;
    this.movieData.description = this.form.get('description').value;

    if (this.movieData.name === '' || this.movieData.description === '') {
      this.displayError = true;
      this.errorMessage = 'Enter the required fields';
      return;
    }

    this.moviesService.addMovie(this.movieData).subscribe(
      response => {
        console.log('SUCCESS', response);
        this.getMovies();
      },
      error => console.log('ERROR SENDING DATA', error)
    );

    this.form.reset();
  }

  hideMessage() {
    console.log('called');
    this.displayError = false;
  }
}
