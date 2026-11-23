import { Pipe, PipeTransform } from '@angular/core';
import { type PieceType } from '../models/game-board';

@Pipe({
  name: 'pieceIcon',
})
export class PieceIcon implements PipeTransform {
  transform(piece: PieceType): string {
    const icon: Record<PieceType, string> = {
      PAWN: '♟',
      ROOK: '♜',
      KNIGHT: '♞',
      BISHOP: '♝',
      QUEEN: '♛',
      KING: '♚',
    };

    return `${icon[piece]}`;
  }
}
