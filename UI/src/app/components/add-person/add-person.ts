
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonService } from '../../services/person';

@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-person.html',
  styleUrl: './add-person.css'
})
export class AddPerson {

  personForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(
    private personService: PersonService,
    private router: Router
  ) {}

  savePerson(): void {
    if (this.personForm.invalid) {
      this.personForm.markAllAsTouched();
      return;
    }

    const name = this.personForm.value.name?.trim();

    if (!name) return;

    this.personService.create({ name }).subscribe({
      next: () => this.router.navigate(['/']),
      error: error => console.error('Unable to add person:', error)
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
