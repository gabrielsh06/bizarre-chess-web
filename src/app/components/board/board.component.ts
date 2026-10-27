import { Component, computed, input } from '@angular/core';
import { BoardResponse } from '../../core/models/board/board.model';

@Component({
    imports: [],
    selector: 'app-board',
    styleUrl: './board.component.scss',
    templateUrl: './board.component.html',
})
export class BoardComponent {

    board = input.required<BoardResponse>();

    squares = computed(() => {
        const list = [];
        const { rows, columns } = this.board();

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                list.push({ row: r, column: c });
            }
        }

        return list;
    });

    getPieceAt(row: number, column: number) {
        return this.board().pieces.find(p => p.row === row && p.column === column);
    }
}
