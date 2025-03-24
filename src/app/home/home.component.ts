import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NasaApiService } from '../nasa-api.service';
import { AsyncPipe } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit, OnInit {
  @ViewChildren('sectionRef') sections!: QueryList<ElementRef>;
  @ViewChildren('imageElements') imageElements!: QueryList<ElementRef>;

  private nasaApiService = inject(NasaApiService);

  pictureOfTheDay = this.nasaApiService.pictureOfTheDay();
  picOfTheDay = this.nasaApiService.picOfTheDayRead;

  ngOnInit(): void {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.sections.forEach((section: ElementRef) => {
        this.animateOnScroll(section.nativeElement);
      });

      this.imageElements.forEach((image: ElementRef) => {
        this.animateOnScroll(image.nativeElement);
      });
    }, 100);
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
        scrollTrigger: {
          trigger: element,
          start: 'top 80%', // Start animation when the top of the element is 80% from the top of the viewport
          end: 'bottom 60%', // End animation when the top of the element is 20% from the top of the viewport
          onEnter: () => {
            gsap.to(element, { opacity: 1, x: 0, duration: 1 });
          },
          onLeave: () => {
            gsap.to(element, { opacity: 0, x: -30, duration: 1 });
          },
          onEnterBack: () => {
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
