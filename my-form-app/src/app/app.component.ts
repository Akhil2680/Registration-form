import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf]
})
export class AppComponent {
  title = 'my-form-app'; // Add this line
  registrationForm: FormGroup;
  submittedData: any = null;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      reading: [false],
      sports: [false],
      music: [false],
      traveling: [false],
      isIndian: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.submittedData = this.registrationForm.value;
      // Format the date for display
      if (this.submittedData.dob) {
        const date = new Date(this.submittedData.dob);
        this.submittedData.dob = date.toLocaleDateString();
      }
    }
  }
}