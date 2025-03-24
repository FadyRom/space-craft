import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  navState = signal<boolean>(false);

  showNav() {
    return this.navState.set(!this.navState());
  }

  openMail() {
    this.showNav(); // Call the method to show navigation
    window.location.href = 'mailto: romanyfady22@gmail.com'; // Open mail client
  }
}
