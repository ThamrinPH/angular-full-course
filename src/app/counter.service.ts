import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  activeInactiveCounter = 2;
  inactiveActiveCounter = 2;
  
  incrementActiveCounter() {
    this.activeInactiveCounter++;
    this.inactiveActiveCounter--;
    console.log("Active : " + this.activeInactiveCounter);
  }

  incrementInactiveCounter() {
    this.inactiveActiveCounter++;
    this.activeInactiveCounter--;
    console.log("Inactive : " + this.inactiveActiveCounter);
  }
}
