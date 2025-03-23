import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-animated-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animated-footer.component.html',
  styleUrl: './animated-footer.component.css',
})
export class AnimatedFooterComponent {
  stars: Array<{ left: string; top: string; animationDuration: string }> = [];

  ngOnInit() {
    this.generateStars(500);
  }

  generateStars(count: number) {
    for (let i = 0; i < count; i++) {
      const left = Math.random() * 100; // Random left position
      const top = Math.random() * 100; // Random top position
      const duration = Math.random() * 2 + 1; // Random duration between 1s and 3s
      this.stars.push({
        left: `${left}vw`,
        top: `${top}vh`,
        animationDuration: `${duration}s`,
      });
    }
  }
}
