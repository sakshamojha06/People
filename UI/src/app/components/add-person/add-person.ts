
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PersonService } from '../../services/person';

@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [ReactiveFormsModule,MatButtonModule,MatIconModule],
  templateUrl: './add-person.html',
  styleUrl: './add-person.css'
})
export class AddPerson {

  personForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(
    private personService: PersonService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  savePerson(): void {
    if (this.personForm.invalid) {
      this.personForm.markAllAsTouched();
      return;
    }

    const name = this.personForm.value.name?.trim();

    if (!name) return;

    this.personService.create({ name }).subscribe({
      next: () => {
        this.snackBar.open('Record added successfully', 'Close', {
          duration: 3500,
          panelClass: ['record-added-snackbar']
        });
        this.router.navigate(['/']);
      },
      error: error => {
        console.error(error);
        alert('Unable to add person.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
