import { Component, inject, signal } from '@angular/core';
import { GameHttp } from '../services/game-http';
import { type BoardResponse } from '../models/game-board';
import { Board } from '../components/board/board';

@Component({
  imports: [Board],
  selector: 'app-game',
  styleUrl: './game.scss',
  templateUrl: './game.html',
})
export class Game {
  private gameHttp = inject(GameHttp);
  board = signal<BoardResponse>({
    rows: 8,
    columns: 8,
    pieces: [],
  });
  gameCode = signal<string>('');

  createGame() {
    this.gameHttp.createGame().subscribe({
      next: (response) => {
        this.board.set(response.boardResponse);
        this.gameCode.set(response.gameCode);
      },
      error: (error) => console.log('Error while creating game', error),
    });
  }

  joinGame(gameCode: string) {
    this.gameHttp.getGameBoard(gameCode).subscribe({
      next: (response) => {
        this.board.set(response);
        this.gameCode.set(gameCode);
      },
      error: (error) => console.log('Game not found', error),
    });
  }
}
