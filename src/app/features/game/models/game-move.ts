import { type Color } from './game-board';

export type RejectReason = 'INVALID_MOVE' | 'NOT_YOUR_TURN' | 'LEAVES_KING_IN_CHECK';
export type GameState =
  'IN_PROGRESS' | 'CHECK' | 'CHECKMATE' | 'STALEMATE' | 'WAITING_FOR_PROMOTION';

export interface MoveResult {
  success: boolean;
  rejectReason: RejectReason | null;
  gameState: GameState | null;
  nextTurn: Color | null;
}

export interface MoveRequest {
  fromRow: number;
  fromColumn: number;
  toRow: number;
  toColumn: number;
}
