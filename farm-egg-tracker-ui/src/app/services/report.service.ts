import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReportService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/reports`;

    getDaily(date: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/daily?date=${date}`);
    }

    getMonthly(year: number, month: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/monthly?year=${year}&month=${month}`);
    }

    getYearly(year: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/yearly?year=${year}`);
    }
}
