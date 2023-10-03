import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SignalRService } from './services/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SignalRTest';
  messageList: any = [];
  constructor(private http: HttpClient,
    private signalR: SignalRService) { }

  ngOnInit() {
    this.signalR.startConnection();
    this.signalR.sendMessage();
    this.signalR.getMessage().subscribe((data: any) => {
      if (data)
        this.messageList.push(data);
    })
    this.GetMessages();
  }

  async GetMessages() {
    let apiURL = "https://localhost:44386/api/Message/GetMessages";
    let result: any = await this.http.get(apiURL).toPromise();

    this.messageList = result;
    console.log(this.messageList)
  }
}
