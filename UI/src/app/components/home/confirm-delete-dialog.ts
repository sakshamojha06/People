import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirm-delete-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatIconModule],
  template: `
    <div class="confirmation-icon" mat-dialog-title>
      <mat-icon aria-hidden="true">delete_outline</mat-icon>
      <span>Delete record?</span>
    </div>

    <mat-dialog-content>
      Are you sure you want to delete this record?
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="warn" (click)="confirm()">
        Yes, delete
      </button>
    </mat-dialog-actions>
  `,
  styles: `
    .confirmation-icon {
      display: flex;
      align-items: center;
      gap: 12px;
      color: #b42318;
    }

    .confirmation-icon mat-icon {
      color: #b42318;
    }

    mat-dialog-content {
      color: #475467;
      font-size: 1rem;
    }
  `
})
export class ConfirmDeleteDialog {
  constructor(
    private readonly dialogRef: MatDialogRef<ConfirmDeleteDialog>
  ) {}

  confirm(): void {
    this.dialogRef.close(true);
  }
}
