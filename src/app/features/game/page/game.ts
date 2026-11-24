import { Component, effect, inject, signal } from '@angular/core';
import { GameHttp } from '../services/game-http';
import { type BoardResponse, type Square } from '../models/game-board';
import { Board } from '../components/board/board';
import { GameSocket } from '../services/game-socket';

@Component({
  imports: [Board],
  selector: 'app-game',
  styleUrl: './game.scss',
  templateUrl: './game.html',
})
export class Game {
  private gameHttp = inject(GameHttp);
  private gameSocket = inject(GameSocket);
  gameCode = signal<string>('');
  board = signal<BoardResponse>({
    rows: 8,
    columns: 8,
    pieces: [],
  });

  constructor() {
    effect(() => {
      const updatePieces = this.gameSocket.pieces();
      if (updatePieces.length > 0) {
        this.board.update((current) => ({
          ...current,
          pieces: updatePieces,
        }));
      }
    });
  }

  createGame() {
    this.gameHttp.createGame().subscribe({
      next: (response) => {
        this.board.set(response.boardResponse);
        this.gameCode.set(response.gameCode);
        this.gameSocket.connect(response.gameCode);
      },
      error: (error) => console.log('Error while creating game', error),
    });
  }

  joinGame(gameCode: string) {
    this.gameHttp.getGameBoard(gameCode).subscribe({
      next: (response) => {
        this.board.set(response);
        this.gameCode.set(gameCode);
        this.gameSocket.connect(gameCode);
      },
      error: (error) => console.log('Game not found', error),
    });
  }

  onMovePiece(event: { from: Square; to: Square }) {
    this.gameSocket.sendMove(this.gameCode(), {
      fromRow: event.from.row,
      fromColumn: event.from.column,
      toRow: event.to.row,
      toColumn: event.to.column,
    });
  }
}
