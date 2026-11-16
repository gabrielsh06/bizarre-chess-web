import { Component, signal } from '@angular/core';
import { Footer } from './core/layout/footer/footer';
import { Game } from './features/game/page/game';

@Component({
  imports: [Footer, Game],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('bizarre-chess-web');
}
