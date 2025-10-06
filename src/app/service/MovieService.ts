import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../model/PaginatedResponse';
import { Movie } from '../model/Movie';
import { YearWinnersCount } from '../model/YearWinnersCount';
import { StudiosWithWinCount } from '../model/StudiosWithWinCount';
import { WinInterval } from '../model/WinInterval';
import { WinnersByYear } from '../model/WinnersByYear';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = 'http://localhost:8080/movie';

  constructor(private http: HttpClient) {}

  getPaginatedMovies(page: number, size: number, filters: any, sort?: string): Observable<PaginatedResponse<Movie>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    const title = filters?.title?.value;
    const movieYear = filters?.movieYear?.value;
    const winner = filters?.winner?.value;

    if (title) {
      params = params.set('title', title);
    }

    if (movieYear) {
      params = params.set('movieYear', movieYear);
    }

    if (winner !== null && winner !== undefined) {
      params = params.set('winner', winner);
    }

    if (sort) {
      params = params.set('sort', sort);
    }

    return this.http.get<PaginatedResponse<Movie>>(this.baseUrl, { params });
  }

  getYearsWithMultipleWinners(): Observable<YearWinnersCount> {
    return this.http.get<YearWinnersCount>(this.baseUrl + '/yearsWithMultipleWinners');
  }

  getStudiosWithWinCount(): Observable<StudiosWithWinCount> {
    return this.http.get<StudiosWithWinCount>(this.baseUrl + '/studiosWithWinCount');
  }

  getMaxMinWinIntervalForProducers(): Observable<WinInterval> {
    return this.http.get<WinInterval>(this.baseUrl + '/maxMinWinIntervalForProducers');
  }

  getWinnersByYear(year: number): Observable<WinnersByYear> {
    return this.http.get<WinnersByYear>(this.baseUrl + '/winnersByYear?year=' + year);
  }

}
