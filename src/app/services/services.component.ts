import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { NasaApiService } from '../nasa-api.service';
import { COLLECTION_LINKS_DATA } from '../interface';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {
  searchTerm = input<string>('');

  private destroyRef = inject(DestroyRef);
  private nasaApiService = inject(NasaApiService);

  numberOfPages = 1;

  collection = computed(() => this.nasaApiService.collection());
  collectionLinksData = computed<COLLECTION_LINKS_DATA[]>(() =>
    this.nasaApiService.collectionLinksData()
  );
  displayCollection = signal<COLLECTION_LINKS_DATA[]>([]);
  noResults = signal<boolean>(false);

  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  loadMore() {
    this.numberOfPages += 2;
    this.displayCollection.set(
      this.collectionLinksData().slice(0, this.numberOfPages)
    );
  }
}
