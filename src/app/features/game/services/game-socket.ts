import { Service, signal } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { environment } from '@env';
import { type MoveRequest } from '../models/game-move';
import { PieceResponse } from '../models/game-board';

@Service()
export class GameSocket {
  private client!: Client;
  pieces = signal<PieceResponse[]>([]);

  connect(gameCode: string) {
    this.client = new Client({
      brokerURL: environment.wsUrl,
      onConnect: () => {
        this.client.subscribe(`/topic/games/${gameCode}`, (message) => {
          const pieces = JSON.parse(message.body);
          this.pieces.set(pieces);
        });
        this.client.subscribe(`/user/queue/move-result`, (message) => {
          const result = JSON.parse(message.body);
          console.log(result);
        });
      },
    });
    this.client.activate();
  }

  sendMove(gameCode: string, move: MoveRequest) {
    this.client.publish({
      destination: `/app/games/${gameCode}/move`,
      body: JSON.stringify(move),
    });
  }

  disconnect() {
    this.client.deactivate().then(() => {
      console.log('WebSocket disconnected successfully');
    });
  }
}
