import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'space-craft';

  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  constructor() {}

  ngOnInit(): void {
    const sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
      }
    });

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }
}
