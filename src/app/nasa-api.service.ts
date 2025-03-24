import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { apiKey } from '../enviroment/enviroment';
import {
  COLLECTION,
  COLLECTION_DATA,
  COLLECTION_LINKS,
  PICTURE_OF_THE_DAY,
} from './interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NasaApiService {
  private httpClient = inject(HttpClient);

  picOfTheDay = signal<PICTURE_OF_THE_DAY>({
    copyright: '',
    date: '',
    explanation: '',
    hdurl: '',
    media_type: '',
    service_version: '',
    title: '',
    url: '',
  });
  picOfTheDayRead = this.picOfTheDay.asReadonly();

  collection = signal<COLLECTION[]>([]);

  collectionLinksData = signal<any[]>([]);

  pictureOfTheDay() {
    return this.httpClient
      .get<PICTURE_OF_THE_DAY>(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
      )
      .pipe(
        tap({
          next: (res) => this.picOfTheDay.set(res),
        })
      );
  }

  searchImages(searchTerm: string) {
    this.collectionLinksData.set([]);
    this.collection.set([]);
    return this.httpClient
      .get<any>(
        `https://images-api.nasa.gov/search?q=${searchTerm}&media_type=image&page_size=100`
      )
      .pipe(
        tap({
          next: (res) => {
            this.collection.set([]);
            this.collection.set(res.collection.items);
          },
          complete: () => {
            this.collectionLinksData.set([]);
            for (let i = 0; i < this.collection().length; i++) {
              const collectionLinks = this.collection()[i].links.find(
                (link: any) => link.rel === 'canonical'
              );

              this.collectionLinksData.update((prev) => [
                ...prev,
                {
                  collectionLinks: collectionLinks,
                  collectionData: this.collection()[i].data[0],
                },
              ]);
            }
            console.log(this.collectionLinksData());
          },
        })
      );
  }
}
