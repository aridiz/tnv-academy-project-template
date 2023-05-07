import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "src/app/@core/services/auth.service";

@Component({
  selector: "tnv-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl("/");
    }
  }

  
  register(form: NgForm) {
    form.control.markAllAsTouched();                                //check if all field are filled
    if (form.valid) {
      this.authService.register(form.value).subscribe({
        next: (response) => {
          localStorage.setItem("user", JSON.stringify(response));
          this.router.navigateByUrl("/profile");                    //when registered, go to profile page to see the data
          this.snackBar.open('Registration succesful', 'Dismiss', {
            duration: 3000,
            verticalPosition: 'bottom'
          });
        },
        error: () => alert("Registration error!"),
      });
    }
  }}
