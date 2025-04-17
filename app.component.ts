import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  registrationForm: FormGroup;
  submissions: any[] = [];
  isEditing: boolean = false;
  currentEditIndex: number | null = null;

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
      const formData = {...this.registrationForm.value};
      
      // Format date for display
      if (formData.dob) {
        formData.dob = new Date(formData.dob).toLocaleDateString();
      }

      if (this.isEditing && this.currentEditIndex !== null) {
        // Update existing entry
        this.submissions[this.currentEditIndex] = formData;
        this.isEditing = false;
        this.currentEditIndex = null;
      } else {
        // Add new entry
        this.submissions.push(formData);
      }
      
      this.registrationForm.reset();
    }
  }

  onEdit(index: number) {
    const submission = this.submissions[index];
    this.registrationForm.patchValue({
      firstName: submission.firstName,
      lastName: submission.lastName,
      dob: submission.dob,
      gender: submission.gender,
      email: submission.email,
      phone: submission.phone,
      reading: submission.reading,
      sports: submission.sports,
      music: submission.music,
      traveling: submission.traveling,
      isIndian: submission.isIndian
    });
    this.isEditing = true;
    this.currentEditIndex = index;
  }

  onDelete(index: number) {
    this.submissions.splice(index, 1);
    if (this.currentEditIndex === index) {
      this.isEditing = false;
      this.currentEditIndex = null;
      this.registrationForm.reset();
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.currentEditIndex = null;
    this.registrationForm.reset();
  }
}