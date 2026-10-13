import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Home } from './home';
import { PersonService } from '../../services/person';
import { Person } from '../../models/person';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let peopleResponse: Subject<Person[]>;
  let dialogResponse: Subject<boolean>;
  let deleteResponse: Subject<void>;
  let deletePerson: ReturnType<typeof vi.fn>;
  let showSnackbar: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    peopleResponse = new Subject<Person[]>();
    dialogResponse = new Subject<boolean>();
    deleteResponse = new Subject<void>();
    deletePerson = vi.fn(() => deleteResponse.asObservable());
    showSnackbar = vi.fn();

    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        provideRouter([]),
        {
          provide: PersonService,
          useValue: {
            getAll: () => peopleResponse.asObservable(),
            delete: deletePerson
          }
        },
        {
          provide: MatDialog,
          useValue: {
            open: () => ({ afterClosed: () => dialogResponse.asObservable() })
          }
        },
        { provide: MatSnackBar, useValue: { open: showSnackbar } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders people received after the initial view check', async () => {
    peopleResponse.next([{ id: 1, name: 'Ada Lovelace' }]);
    await fixture.whenStable();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows).toHaveLength(1);
    expect(rows[0].textContent).toContain('Ada Lovelace');
  });

  it('deletes only after confirmation and displays a success message', () => {
    component.deletePerson(1);

    expect(dialogResponse.observed).toBe(true);
    expect(deletePerson).not.toHaveBeenCalled();

    dialogResponse.next(true);
    expect(deletePerson).toHaveBeenCalledWith(1);

    deleteResponse.next();
    expect(showSnackbar).toHaveBeenCalledWith(
      'Record deleted successfully',
      'Close',
      expect.objectContaining({
        panelClass: ['record-deleted-snackbar']
      })
    );
  });
});
