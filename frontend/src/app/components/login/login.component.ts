import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messageClass;
  message;
  processing = false;
  form: FormGroup;
  previousUrl;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private authGuard: AuthGuard
  ) {
    this.createForm(); // Create Login Form when component is constructed
  }

  // Function to create login form
  createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required], // Email field
      password: ['', Validators.required] // Password field
    });
  }


  // Function to disable form
  disableForm() {
    this.form.controls['email'].disable(); // Disable email field
    this.form.controls['password'].disable(); // Disable password field
  }

  // Function to enable form
  enableForm() {
    this.form.controls['email'].enable(); // Enable email field
    this.form.controls['password'].enable(); // Enable password field
  }


  onLoginSubmit() {
    this.processing = true; // Used to submit button while is being processed
    this.disableForm(); // Disable form while being process
    // Create user object from user's input
    const user = {
      email: this.form.get('email').value, // Email input field
      password: this.form.get('password').value // Password input field
    }


    console.log(user);

    this.authService.login(user).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'danger center-align';
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'success center-align';
        this.message = data.message;
        this.authService.storeUserData(data.token, data.user);

        setTimeout(() => {
          if(this.previousUrl){
            this.router.navigate([this.previousUrl]);
          } else {
            this.router.navigate(['/dashboard']);
          }
        }, 2000);
      }
    });


  }

  ngOnInit() {

    if (this.authGuard.redirectUrl) {
      this.messageClass = 'danger center-align'; // Set error message: need to login
      this.message = 'You must be logged in to view that page.'; // Set message
      this.previousUrl = this.authGuard.redirectUrl; // Set the previous URL user was redirected from
      this.authGuard.redirectUrl = undefined; // Erase previous URL
    }

  }

}
