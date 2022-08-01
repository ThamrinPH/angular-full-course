import { Component, EventEmitter, Output } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent {
  users: string[];

  onSetToActive(id: number) {
    this.usersService.onSetToActive(id);
  }

  constructor(private usersService: UsersService) {
    this.users = this.usersService.inactiveUsers;
  }
}
