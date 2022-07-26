import { style } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // external style
  // styleUrls: ['./app.component.css']
  // Inline style
  styles: [`
    h3 {
      color: blue;
    }
  `]
})
export class AppComponent {
}
