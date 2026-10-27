export interface PieceResponse {
    type: string;
    color: string;
    row: number;
    column: number;
}

export interface BoardResponse {
    rows: number;
    columns: number;
    pieces: PieceResponse[];
}
