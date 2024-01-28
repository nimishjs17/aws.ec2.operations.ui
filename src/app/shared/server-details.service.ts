import { Injectable } from '@angular/core';
import { ec2RequestModel, ServerDetailsModel } from './server-details.model';
import { HttpClient } from '@angular/common/http'
import { timeInterval } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ServerDetailsService {

  constructor(private httpRequestHandler: HttpClient, private notificationTostr: ToastrService) { }

  ec2Response: ServerDetailsModel = new ServerDetailsModel();

  ec2Request: ec2RequestModel = new ec2RequestModel()

  baseURL = 'https://localhost:5001/api/core/ec-2/list-all-servers'
  baseURL2 = 'https://localhost:5001/api/core/ec-2/stop-by-id'
  baseURL3 = 'https://localhost:5001/api/core/ec-2/start-by-id'
  listAllServers() {
    this.ec2Request.authToken = "sdawdgbgeae";

    console.log("Called : Service listAllServer")
    this.httpRequestHandler.post(this.baseURL, this.ec2Request).toPromise()
      .then(res => this.ec2Response = res as ServerDetailsModel);

  }

  stopServerByid(instanceid: string) {
    this.ec2Request.authToken = "sdawdgbgeae";
    this.ec2Request._instanceIds = [instanceid]

    console.log("Called : Service stopServerByid")
    return this.httpRequestHandler.post(this.baseURL2, this.ec2Request)
  }

  startServerByid(instanceid: string) {
    this.ec2Request.authToken = "sdawdgbgeae";
    this.ec2Request._instanceIds = [instanceid]

    console.log("Called : Service startServerByid")
    return this.httpRequestHandler.post(this.baseURL3, this.ec2Request)
  }
}
