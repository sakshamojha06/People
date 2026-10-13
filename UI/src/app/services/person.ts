import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Person } from "../models/person";

@Injectable({
  providedIn: "root",
})
export class PersonService {
    private apiUrl = "http://localhost:5119/api/People";

    constructor(private http: HttpClient) {}

    getAll(): Observable<Person[]> {
        return this.http.get<Person[]>(this.apiUrl);
    }

    getById(id: number): Observable<Person> {
        return this.http.get<Person>(`${this.apiUrl}/${id}`);
    }

    create(person: Omit<Person, 'id'>): Observable<string> {
        return this.http.post(this.apiUrl, person, { responseType: "text" });
    }

    update(id: number, person: Partial<Person>): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${id}`, person);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}