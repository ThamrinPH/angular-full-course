import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private serversService: ServersService) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    if(id){
      this.server = this.serversService.getServer(+id);
  
      this.paramsSubscription = this.route.params.subscribe( 
        (params: Params) => {
          this.server = this.serversService.getServer(+params['id']);
      });
    }
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }

}
