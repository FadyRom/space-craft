import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  QueryList,
  signal,
  viewChildren,
} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';

import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit, AfterViewInit {
  private router = inject(Router);

  images = viewChildren<QueryList<ElementRef>>('image');

  imageSrc = signal<{ src: string; alt: string }[]>([
    { src: '/gallery/black-hole.jpg', alt: 'black-hole' },
    { src: '/gallery/supernova.jpg', alt: 'supernova' },
    { src: '/gallery/dark-stars.jpg', alt: 'dark-stars' },
    { src: '/gallery/nebula.jpg', alt: 'nebula' },
    { src: '/gallery/space.jpg', alt: 'space' },
    { src: '/gallery/universe.jpg', alt: 'universe' },
    { src: '/gallery/auroras.jpg', alt: 'auroras' },
    { src: '/gallery/astronaut.jpg', alt: 'astronaut' },
    { src: '/gallery/planets.jpg', alt: 'planets' },
  ]);

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.images().forEach((image: any) => {
        this.animateOnScroll(image.nativeElement);
      });
    }, 100);
  }

  searchImage(alt: string) {
    this.router.navigate(['/services', alt]);
  }

  animateOnScroll(element: HTMLElement) {
    gsap.fromTo(
      element,
      { opacity: 0, x: -30 }, // Start from -3rem (30px) on both axes
      {
        opacity: 1,
        x: 0, // End at original position
        y: 0, // End at original position
        duration: 1,
        // stagger: 1,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%', // Start animation when the top of the element is 80% from the top of the viewport
          end: 'bottom 60%', // End animation when the top of the element is 20% from the top of the viewport
          onEnter: () => {
            gsap.to(element, { opacity: 1, x: 0, duration: 1 });
          },

          onLeaveBack: () => {
            gsap.to(element, { opacity: 0, x: -30, duration: 1 });
          },
        },
      }
    );
  }
}
