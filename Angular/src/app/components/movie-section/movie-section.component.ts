import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth.service';
import { ApiService } from 'src/app/@shared/services/api.service';
import { FavoritesService } from 'src/app/@shared/services/favorites.service';
import { RatingService } from 'src/app/@shared/services/rating.service';
import { Movie } from 'src/app/models/movie';
import { Rating } from 'src/app/models/rating';


@Component({
  selector: 'tnv-movie-section',
  templateUrl: './movie-section.component.html',
  styleUrls: ['./movie-section.component.scss']
})
export class MovieSectionComponent implements OnInit {

  formData = {
    ratingNum: '',
    review: ''
  };

  @ViewChild(MatAccordion) accordion!: MatAccordion; //accordion input for rating
  @ViewChild('f') form!: NgForm; //form data

  @Input() movies: Movie[] = []; //CHECK

  userId = this.authService.getCurrentUser().id.toString();

  constructor(private apiService: ApiService,
    private favoritesService: FavoritesService,
    private ratingService: RatingService,
    private authService: AuthService, //recupero dati user > Id
    private router: Router            //CHECK
  ) { }

  ngOnInit() {
    // You can initialize the form data here if necessary
  }

  resetFormValues() {
    this.form.resetForm();
  }

  getPoster(imgUrl: string | null) {
    return this.apiService.getPoster(imgUrl);
  }

  addToFavorites(movie: any) {    //TEST GABRIEL
    this.favoritesService.addFavorite(movie);
  }

  //GetMovies > GetUserId (AuthService> Currentuser.id = xxx) > 

  compileRating(movieId: number, formData: {ratingNum : string, review: string}) {
    if (!this.form.value.review || !this.form.value.ratingNum) {
    console.log("Error: Review or rating missing");
    return;
    }
    const rating: Rating = {
      userId: this.userId,
      movieId: movieId.toString(),
      review: this.formData.review,
      rating: parseInt(this.formData.ratingNum) //parsing the string of rate
    };
    console.log("Review: ", this.formData.review);
    console.log("Rating: ", this.form.value.ratingNum);
    console.log("Movie ID: ", movieId);
    console.log("User ID: ", this.userId);

    this.ratingService.addRating(rating).subscribe({
      next: () => {
        this.resetFormValues();  //reset form values
      },
      error: () => console.error('Error'),
    });
  }
}
