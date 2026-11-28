import { Component, computed, input, output, signal } from '@angular/core';
import { type BoardResponse, type Square } from '../../models/game-board';
import { PieceIcon } from '../../pipes/piece-icon';

@Component({
  imports: [PieceIcon],
  selector: 'app-board',
  styleUrl: './board.scss',
  templateUrl: './board.html',
})
export class Board {
  board = input.required<BoardResponse>();

  squares = computed<Square[]>(() => {
    const { rows, columns, pieces } = this.board();
    const result: Square[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        const piece = pieces.find((p) => p.row === r && p.column === c);

        result.push({
          id: `${r}-${c}`,
          row: r,
          column: c,
          color: (r + c) % 2 !== 0 ? 'BLACK' : 'WHITE',
          piece: piece,
        });
      }
    }
    return result;
  });

  selectedSquare = signal<Square | null>(null);
  move = output<{ from: Square; to: Square }>();

  selectSquare(target: Square) {
    const current = this.selectedSquare();

    if (!current) {
      if (target.piece) {
        this.selectedSquare.set(target);
      }
      return;
    }

    if (current.id === target.id) {
      this.selectedSquare.set(null);
      return;
    }

    this.move.emit({ from: current, to: target });
    this.selectedSquare.set(null);
  }

  getFileLabel(column: number): string {
    return String.fromCharCode(97 + column);
  }
}
