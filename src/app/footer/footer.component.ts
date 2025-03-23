import { Component } from '@angular/core';
import { AnimatedFooterComponent } from './animated-footer/animated-footer.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [AnimatedFooterComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {}
