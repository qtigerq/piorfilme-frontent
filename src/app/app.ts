import { Component, signal } from '@angular/core';
import { Topbar } from './components/topbar/topbar';
import { Menu } from './components/menu/menu';
import { MainContent } from './components/main-content/main-content';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Topbar,
    Menu,
    MainContent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('pior-filme');
}
