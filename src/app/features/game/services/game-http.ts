import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BoardResponse, CreateGameResponse } from '../models/game-board';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Service()
export class GameHttp {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/games`;

  createGame(): Observable<CreateGameResponse> {
    return this.http.post<CreateGameResponse>(this.apiUrl, null);
  }

  getGameBoard(gameCode: string): Observable<BoardResponse> {
    return this.http.get<BoardResponse>(`${this.apiUrl}/${gameCode}/board`);
  }
}
