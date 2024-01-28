export class ServerDetailsModel {
    isSuccess: boolean = false;
    errorMessage: string = "";
    response: ec2ResponseModel[];
}

export class ec2ResponseModel {
    "_instanceId": string = "";
    "_isntanceName": string = "";
    "_ipAddress": string = "";
    "_code": number = 0;
    "_state": string = "";
}

export class ec2RequestModel {
    "authToken": string = "";
    "_instanceIds": string[];
}