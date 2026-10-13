import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { AddPerson } from './add-person';
import { PersonService } from '../../services/person';

describe('AddPerson', () => {
  let component: AddPerson;
  let fixture: ComponentFixture<AddPerson>;
  let showSnackbar: ReturnType<typeof vi.fn>;
  let createPerson: ReturnType<typeof vi.fn>;
  let router: Router;

  beforeEach(async () => {
    showSnackbar = vi.fn();
    createPerson = vi.fn(() => of('Person created successfully.'));

    await TestBed.configureTestingModule({
      imports: [AddPerson],
      providers: [
        provideRouter([]),
        {
          provide: PersonService,
          useValue: { create: createPerson }
        },
        { provide: MatSnackBar, useValue: { open: showSnackbar } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPerson);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows an Angular Material success notification after adding a record', () => {
    component.personForm.controls.name.setValue('Ada Lovelace');
    component.savePerson();

    expect(createPerson).toHaveBeenCalledWith({ name: 'Ada Lovelace' });
    expect(showSnackbar).toHaveBeenCalledWith(
      'Record added successfully',
      'Close',
      expect.objectContaining({
        panelClass: ['record-added-snackbar']
      })
    );
    expect(router.url).toBe('/');
  });
});
