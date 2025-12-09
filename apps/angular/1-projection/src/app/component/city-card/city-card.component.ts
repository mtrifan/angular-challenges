import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      [backgroundColor]="'rgba(0, 0, 250, 0.1)'"
      (addItem)="addItemEventHandler()"
      (deleteItem)="deleteItemEventHandler($event)"
      customClass="bg-light-blue">
      <img ngSrc="assets/img/city.png" width="200" height="200" />

      <ng-template #listItem let-city>
        {{ city.name }}
      </ng-template>
    </app-card>
  `,
  imports: [CardComponent, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  addItemEventHandler(): void {
    this.store.addOne(randomCity());
  }

  deleteItemEventHandler(id: number): void {
    this.store.deleteOne(id);
  }
}
