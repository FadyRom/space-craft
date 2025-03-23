import { Component, HostListener, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  h3Element = input.required<string>();
  h2Element = input.required<string>();
  imageSrc = input.required<string>();
}
