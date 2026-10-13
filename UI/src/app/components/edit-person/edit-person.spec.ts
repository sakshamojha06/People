import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { EditPerson } from './edit-person';
import { PersonService } from '../../services/person';

describe('EditPerson', () => {
  let component: EditPerson;
  let fixture: ComponentFixture<EditPerson>;
  let showSnackbar: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    showSnackbar = vi.fn();

    await TestBed.configureTestingModule({
      imports: [EditPerson],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } }
        },
        {
          provide: PersonService,
          useValue: {
            getById: () => of({ id: 1, name: 'Ada Lovelace' }),
            update: () => of(undefined)
          }
        },
        { provide: MatSnackBar, useValue: { open: showSnackbar } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPerson);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows a blue success notification after updating a record', () => {
    component.personForm.controls.name.setValue('Grace Hopper');
    component.updatePerson();

    expect(showSnackbar).toHaveBeenCalledWith(
      'Record updated successfully',
      'Close',
      expect.objectContaining({
        panelClass: ['record-updated-snackbar']
      })
    );
  });
});
