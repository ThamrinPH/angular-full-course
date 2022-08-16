import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;
  paramSubscription = null;

  constructor(private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
      }
    );
    this.route.fragment.subscribe();
    const id = this.route.snapshot.params.id;
    this.server = this.serversService.getServer(+id);

    this.paramSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params.id);
      }
    );

    if(this.server){
      this.serverName = this.server.name;
      this.serverStatus = this.server.status;
    }
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean{
    if ( !this.allowEdit ){
      return true;
    }

    if(this.serverName !== this.server.name || this.serverStatus !== this.server.status && this.changesSaved === false) {
      return confirm('Do you want to discard the changes?');      
    }else{
      return true;
    }
  }


}
