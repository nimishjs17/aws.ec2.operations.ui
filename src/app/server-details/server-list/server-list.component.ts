import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ec2ResponseModel } from 'src/app/shared/server-details.model';
import { ServerDetailsService } from 'src/app/shared/server-details.service';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styles: [
  ]
})
export class ServerListComponent implements OnInit {

  constructor(public service: ServerDetailsService, private notificationTostr: ToastrService) {

  }

  ngOnInit(): void {

  }

  serverName: any;
  
  listAllServers() {
    this.service.listAllServers();
  }
  async stopServer(id: string) {
    let refreshCounter = 0;
    this.service.stopServerByid(id).subscribe(
      async res => {
        this.serverName = this.service.ec2Response.response.find((x: { _instanceId: string; }) => x._instanceId == id);
        this.notificationTostr.success(this.serverName._isntanceName, "Stopping Server");
        this.service.listAllServers();

        let isStopSuccess = false;
        do {
          refreshCounter++;
          await this.delay(8000);
          this.listAllServers()
          this.serverName = this.service.ec2Response.response.find((x: { _instanceId: string; }) => x._instanceId == id);
          if (this.serverName._state == "stopped") {
            isStopSuccess = true
          }
          console.log(isStopSuccess);
          if (refreshCounter > 10) {
            console.log("Reached Maximum Refresh. Please Refresh The Page Manually");
            isStopSuccess = true;
          }
        }
        while (isStopSuccess == false)
      },
      err => {
        console.log(err)
      }
    );
  }

  async startServer(id: string) {
    let refreshCounter = 0;
    this.service.startServerByid(id).subscribe(
      async res => {
        this.serverName = this.service.ec2Response.response.find((x { _insta:nceId: string; }) => x._instanceId == id);
        this.notificationTostr.success(this.serverName._isntanceName, "Starting Server");
        this.service.listAllServers();

        let isStartSuccess = false;
        do {
          await this.delay(8000);
          refreshCounter++;
          this.listAllServers()
          this.serverName = this.service.ec2Response.response.find((x: { _instanceId: string; }) => x._instanceId == id);
          if (this.serverName._state == "running") {
            isStartSuccess = true
          }
          console.log(isStartSuccess);
          if (refreshCounter > 10) {
            console.log("Reached Maximum Refresh. Please Refresh The Page Manually");
            isStartSuccess = true;
          }
        }
        while (isStartSuccess == false)
      }
      ,
      err => {
        this.notificationTostr.error(err.error.errorMessage, "Error Occured");
        console.log(err)
      }
    );

  }

  delay(ms: number) {
    console.log("Delayed by : ", ms)
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
