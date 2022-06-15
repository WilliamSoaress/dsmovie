import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  /**
   * Endpoint a ser utilizado pelo service
   */
  private readonly endpoint: string = '/tb_movie';

  constructor(private http: HttpClient) {}

  /**
   * Obtém todos os registros existentes no endpoint informado
   * @returns Observable com todos os registros
   */
  public readAll(): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(`${environment.API_URL}${this.endpoint}`)
      .pipe(take(1));
  }

  public create(record: Movie): Observable<Movie> {
    return this.http.post<Movie>(
      `${environment.API_URL}${this.endpoint}`,
      record
    );
  }
}
