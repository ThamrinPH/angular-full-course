import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() switchHeader = new EventEmitter<string>();

  selectMenu(menu: string)
  {
    this.switchHeader.emit(menu)
  }
}
