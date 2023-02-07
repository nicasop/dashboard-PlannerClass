import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FireMessagingService {
  constructor( private http: HttpClient ) { }

  token: string = "e19U8vVgSniMK-8k553OoN:APA91bFqRzOOKqGZwYDggX18YZ-1uYU839FQmIleCRa8w0jWur29m7ZEH0MqJCw_VsgD2e9nVo_OZNoYQ0pORst13xhwJGHGjt-SGYgQYgoy-366EaCpqxNez224RdfTHZzlAS8TPGD3";
  endpoint: string  = "https://fcm.googleapis.com/fcm/send";


  sendNotification(name: string){
    const header = {
      'Content-Type':'application/json',
      'Authorization': 'key=AAAAbPpW4tg:APA91bH51Z4b8vTKSQq7W8V2XTlu-uEK_1f1IjAhON60waj7zAYZapgPU2PHJvpA4XuH2CI5hSStmNuBi6VoKiEugx-S2ROo8JtO6vw1Kf2AlDgT84WvnR6Q8jkgJyvIJ38UBM7pm6MZ'
    }

    const headers = new HttpHeaders(header);

    const body = {
      "notification": {
        "title": "Registrar Información",
        "body": name+" realice su registro porfavor"
      },
      "priority":"high",
      "to": this.token
    }

    return this.http.post(this.endpoint, body, {headers: headers})
  }

}
