import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  constructor() { }

  ngOnInit() {
    // this.subscription = interval(1000).subscribe(
    //   count => {
    //     console.log(count);
    //   }
    // );

    const costumIntervalObservable = Observable.create( observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count); // to emit a new value
        count++;
        // observer.error(); // to use throw an error
        // observer.complete(); // how to let your observable know that you are done
      }, 1000)
    });

    this.subscription = costumIntervalObservable.subscribe( data => {
      console.log(data);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
