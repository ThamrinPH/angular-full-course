import { NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  standalone: true,
  styleUrls: ['./signals.component.css'],
  imports: [NgFor],
})
export class SignalsComponent {
  actions = signal<string[]>([]);
  counter = signal(0);

  increment() {
    // this.counter.update((oldValue) => oldValue + 1);
    // this.counter.set(5); // setting a new value 
    this.counter.set(this.counter() + 1); // alternative beside update

    this.actions.update( (oldActions) => [...oldActions, 'INCREMENT']);
  }

  decrement() {
    // this.counter.update((oldValue) => oldValue -1);
    // this.counter.set(5); // setting a new value 
    this.counter.set(this.counter() - 1); // alternative beside update

    this.actions.update( (oldActions) => [...oldActions, 'DECREMENT']);
  }
}
