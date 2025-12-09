import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [style.backgroundColor]="'rgba(250, 0, 0, 0.1)'"
      [list]="teachers()"
      [backgroundColor]="'rgba(250, 0, 0, 0.1)'"
      (addItem)="addItemEventHandler()"
      (deleteItem)="deleteItemEventHandler($event)">
      <img ngSrc="assets/img/teacher.png" width="200" height="200" />

      <ng-template #listItem let-teacher>
        {{ teacher.firstName }}
      </ng-template>
    </app-card>
  `,
  imports: [CardComponent, NgOptimizedImage],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addItemEventHandler(): void {
    this.store.addOne(randTeacher());
  }

  deleteItemEventHandler(id: number): void {
    this.store.deleteOne(id);
  }
}
