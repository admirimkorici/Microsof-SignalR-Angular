import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public observedData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private hubConnection: any = HubConnection;
  chathubURL: string = "";
  constructor() { }

  public startConnection = () => {
    this.chathubURL = "https://localhost:44386";
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.chathubURL + '/chathub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

    this.hubConnection.start()
      .then(() => console.log('Connection to SignalR started-----'))
      .catch((err: any) => console.log('SignalR Connection Error:' + err))
  }

  sendMessage = () => {
    this.hubConnection.on('ReceiveMessage', (data: any) => {
      this.observedData.next(data);
    })
  }

  getMessage() {
    return this.observedData.asObservable();
  }
}
