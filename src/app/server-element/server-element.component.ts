import { Component, Input, OnInit } from '@angular/core';
import { Server } from './server.model';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit {

  @Input('srvElement') element: {
    name: string, 
    type: string, 
    content: string
  };

  constructor() { }

  ngOnInit(): void {
  }

}
