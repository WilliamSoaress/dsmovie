import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Score } from '../models/score';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  /**
   * Endpoint a ser utilizado pelo service
   */
  private readonly endpoint: string = '/tb_score';

  constructor(private http: HttpClient) {}

  /**
   * Obtém todos os registros existentes no endpoint informado
   * @returns Observable com todos os registros
   */
  public readAll(): Observable<Score[]> {
    return this.http
      .get<Score[]>(`${environment.API_URL}${this.endpoint}`)
      .pipe(take(1));
  }

  public create(record: Score): Observable<Score> {
    return this.http.post<Score>(
      `${environment.API_URL}${this.endpoint}`,
      record
    );
  }
}
