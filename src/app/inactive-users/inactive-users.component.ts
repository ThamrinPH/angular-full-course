import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent implements OnInit{
  users: string[];

  onSetToActive(id: number) {
    this.usersService.onSetToActive(id);
  }

  constructor(private usersService: UsersService) {
  }
  
  ngOnInit(): void {
    this.users = this.usersService.inactiveUsers;    
  }
}
