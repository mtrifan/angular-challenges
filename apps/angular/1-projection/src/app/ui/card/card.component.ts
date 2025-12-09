import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [style.background-color]="backgroundColor()">
      <ng-content></ng-content>
      <section>
        @for (item of list(); track item) {
          <app-list-item [item]="item" (deleteItem)="onDeleteItem($event)">
            <ng-container
              *ngTemplateOutlet="
                listItemTemplate();
                context: { $implicit: item }
              "></ng-container>
          </app-list-item>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="onAddItem()">
        Add
      </button>
    </div>
  `,
  imports: [ListItemComponent, NgTemplateOutlet],
})
export class CardComponent {
  readonly backgroundColor = input<string>('');
  readonly list = input<any[] | null>(null);
  readonly customClass = input('');
  readonly listItemTemplate =
    contentChild.required<TemplateRef<any>>('listItem');

  addItem = output();
  deleteItem = output<number>();

  onAddItem() {
    this.addItem.emit();
  }
  onDeleteItem(id: number) {
    this.deleteItem.emit(id);
  }
}
