import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonService } from '../../services/person';

@Component({
  selector: 'app-edit-person',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './edit-person.html',
  styleUrl: './edit-person.css'
})
export class EditPerson implements OnInit {

  personId!: number;

  personForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.personId = Number(this.route.snapshot.paramMap.get('id'));

    this.personService.getById(this.personId).subscribe({
      next: person => {
        this.personForm.patchValue({ name: person.name });
      },
      error: error => {
        console.error(error);
        alert('Unable to load person.');
        this.router.navigate(['/']);
      }
    });
  }

  updatePerson(): void {
    if (this.personForm.invalid) {
      this.personForm.markAllAsTouched();
      return;
    }

    const name = this.personForm.value.name?.trim();

    if (!name) return;

    this.personService.update(this.personId, { name }).subscribe({
      next: () => {
        this.snackBar.open('Record updated successfully', 'Close', {
          duration: 3500,
          panelClass: ['record-updated-snackbar']
        });
        this.router.navigate(['/']);
      },
      error: error => {
        console.error(error);
        alert('Unable to update person.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
