import { Component, OnInit } from '@angular/core';
import { ServerDetailsService } from '../shared/server-details.service';

@Component({
  selector: 'app-server-details',
  templateUrl: './server-details.component.html',
  styles: [
  ]
})
export class ServerDetailsComponent implements OnInit {

  constructor(public service: ServerDetailsService) { }

  ngOnInit(): void {
    this.service.listAllServers();
  }

}
