import { Component, computed, input } from '@angular/core';
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
}
