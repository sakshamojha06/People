
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PersonService } from '../../services/person';
import { Person } from '../../models/person';
import { ConfirmDeleteDialog } from './confirm-delete-dialog';

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

  people = signal<Person[]>([]);

  loading = signal(false);

  errorMessage = signal('');

  constructor(
    private personService: PersonService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {

    this.loading.set(true);
    this.errorMessage.set('');

    this.personService.getAll().subscribe({

      next: (data: Person[]) => {
        console.log('People received from API:', data);

        this.people.set(data);
        this.loading.set(false);
      },

      error: (error) => {
        console.error('Unable to load people:', error);

        this.errorMessage.set('Unable to load people.');
        this.loading.set(false);
      }

    });
  }

  deletePerson(id: number): void {
    this.dialog.open(ConfirmDeleteDialog, {
      width: '420px',
      maxWidth: 'calc(100vw - 32px)',
      panelClass: 'delete-confirm-dialog',
      ariaLabel: 'Confirm record deletion'
    }).afterClosed().subscribe(confirmed => {
      if (!confirmed) {
        return;
      }

      this.personService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Record deleted successfully', 'Close', {
            duration: 3500,
            panelClass: ['record-deleted-snackbar']
          });
          this.loadPeople();
        },
        error: error => {
          console.error('Unable to delete person:', error);
          alert('Unable to delete person.');
        }
      });
    });
  }
}
