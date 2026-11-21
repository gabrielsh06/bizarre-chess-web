export type PieceType = 'PAWN' | 'ROOK' | 'KNIGHT' | 'BISHOP' | 'QUEEN' | 'KING';
export type Color = 'WHITE' | 'BLACK';

export interface BoardResponse {
  rows: number;
  columns: number;
  pieces: PieceResponse[];
}

export interface CreateGameResponse {
  gameCode: string;
  boardResponse: BoardResponse;
}

export interface PieceResponse {
  type: PieceType;
  color: Color;
  row: number;
  column: number;
}

export interface Square {
  id: string;
  row: number;
  column: number;
  color: Color;
  piece?: PieceResponse;
}
