import { Component, inject, signal } from '@angular/core';
import { GameHttp } from '../services/game-http';
import { BoardResponse } from '../models/game-board';

@Component({
  imports: [],
  selector: 'app-game',
  styleUrl: './game.scss',
  templateUrl: './game.html',
})
export class Game {
  private gameHttp = inject(GameHttp);
  board = signal<BoardResponse | undefined>(undefined);
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
