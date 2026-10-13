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

    update(id: number, person: Partial<Person>): Observable<string> {
        return this.http.put(`${this.apiUrl}/${id}`, person, { responseType: "text" });
    }

    delete(id: number): Observable<string> {
        return this.http.delete(`${this.apiUrl}/${id}`, { responseType: "text" });
    }
}