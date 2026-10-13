
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PersonService } from '../../services/person';
import { Person } from '../../models/person';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  people: Person[] = [];

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.personService.getAll().subscribe({
      next: data => this.people = data,
      error: error => console.error('Unable to load people:', error)
    });
  }

  deletePerson(id: number | undefined): void {
    if (id === undefined) {
      console.warn('Cannot delete a person without an id.');
      return;
    }

    const confirmDelete = confirm('Are you sure you want to delete this person?');

    if (!confirmDelete) return;

    this.personService.delete(id).subscribe({
      next: () => this.loadPeople(),
      error: error => console.error('Unable to delete person:', error)
    });
  }
}
