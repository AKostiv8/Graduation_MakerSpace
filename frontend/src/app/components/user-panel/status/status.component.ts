import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  form: FormGroup;
  message;
  messageClass;
  processing = false;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createForm()
  }

  createForm(){
    this.form = this.formBuilder.group({
      tax: ['', Validators.compose([
        Validators.required,
        this.validateNumber
      ])]
    });
  }

  disableForm() {

    this.form.controls['tax'].disable();
  }


  enableForm() {
    this.form.controls['tax'].enable();
  }

  validateNumber(controls){
    // Create a regular expression
    const regExp = new RegExp(/^\d+$/);
    // Test email against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { 'validateNumber': true } // Return as invalid email
    }
  }

  onRegisterSubmit(){

    this.processing = true; // Used to notify HTML that form is in processing, so that it can be disabled
    this.disableForm(); // Disable the form
    // Create user object form user's inputs
    const taxValue = {
      tax: this.form.get('tax').value
    }


    if(!taxValue){
      this.disableForm();
    }else{
      this.enableForm();
      this.form.reset();
      this.processing = false;

    }

  }

  ngOnInit() {
  }

}
