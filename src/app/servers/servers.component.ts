import { Attribute, Component, OnInit } from '@angular/core';

@Component({
  // select as Attribute
  // selector: '[app-servers]',
  // select as class
  selector: '.app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
