import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { NasaApiService } from '../nasa-api.service';
import { COLLECTION_LINKS_DATA } from '../interface';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { NgStyle } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NgStyle],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
  animations: [
    trigger('scaleFade', [
      state(
        'visible',
        style({
          transform: 'scale(1)',
          opacity: 1,
        })
      ),
      state(
        'hidden',
        style({
          transform: 'scale(0.8)',
          opacity: 0,
        })
      ),
      transition('hidden => visible', [animate('0.8s ease-in-out')]),
    ]),
  ],
})
export class ServicesComponent implements OnInit, AfterViewInit {
  searchTerm = input<string>('');

  private destroyRef = inject(DestroyRef);
  private nasaApiService = inject(NasaApiService);
  private router = inject(Router);

  numberOfPages = 1;
  carouselIndex = 0;

  collection = computed(() => this.nasaApiService.collection());
  collectionLinksData = computed<COLLECTION_LINKS_DATA[]>(() =>
    this.nasaApiService.collectionLinksData()
  );
  displayCollection = signal<COLLECTION_LINKS_DATA[]>([]);
  noResults = signal<boolean>(false);
  carouselImages = signal<string[]>([
    '/carousel/space-guy.jpg',
    '/carousel/black-hole.png',
    '/carousel/blue-sky.jpg',
    '/carousel/galaxy.jpg',
    '/carousel/space.jpg',
  ]);
  animationState = signal<'hidden' | 'visible'>('visible'); // ✅ Track animation state
  displayedCarousel = signal<string>(this.carouselImages()[this.carouselIndex]);

  ngOnInit() {
    // window.scrollTo({ top: 0, behavior: 'smooth' });
    if (this.searchTerm()) {
      const sub = this.nasaApiService
        .searchImages(this.searchTerm())
        .subscribe({
          complete: () => {
            this.displayCollection.set(this.collectionLinksData().slice(0, 2));
            this.noResults.set(this.displayCollection().length === 0);
          },
        });

      this.destroyRef.onDestroy(() => {
        sub.unsubscribe();
      });
    }
  }

  ngAfterViewInit(): void {
    setInterval(() => {
      this.changeCarousel();
    }, 5000);
  }

  loadMore() {
    this.numberOfPages += 2;
    this.displayCollection.set(
      this.collectionLinksData().slice(0, this.numberOfPages)
    );
  }

  changeCarousel() {
    this.animationState.set('hidden'); // ✅ Fade out animation

    setTimeout(() => {
      this.carouselIndex =
        (this.carouselIndex + 1) % this.carouselImages().length;
      this.displayedCarousel.set(this.carouselImages()[this.carouselIndex]);

      this.animationState.set('visible'); // ✅ Fade in animation
    }, 0); // Change image halfway through animation
  }

  searchNasa(searchInput: string) {
    this.router.navigate(['/services/', searchInput]);
  }
}
