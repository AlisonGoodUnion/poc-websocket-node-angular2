import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Websocket Angular client ';
  userName: string;
  message: string;
  output: any[] = [];
  outrasala: any[] = [];
  feedback: string;
  room: any;

  constructor(private webSocketService: WebSocketService) { }
  ngOnInit(): void {
    this.webSocketService.listen('typing').subscribe((data) => this.updateFeedback(data));
    this.webSocketService.listen('chat').subscribe((data) => this.updateMessage(data));
    this.webSocketService.listen('send')
      .subscribe((data) => this.updateMessageOutro(data));
    // this.webSocketService.listen('/send/:room')
    //   .subscribe((data) => this.updateMessageOutro(data));
  }

  messageTyping(): void {
    this.webSocketService.emit('typing', this.userName);
  }

  sendMessage(): void {
    console.log('sendMessage');
    this.webSocketService.emit('chat', {
      message: this.message,
      handle: this.userName
    });
    this.message = "";
  }

  updateMessage(data:any) {
    this.feedback = '';
    if(!!!data) return;
    console.log(`${data.handle} : ${data.message}`);
    this.output.push(data);
  }

  updateMessageOutro(data: any) {
    console.log('updateMessageOutro');
    if(!!!data) return;
    console.log(`${data.room} : ${data.message}`);
    this.outrasala.push(data);
  }

  updateFeedback(data: any) {
    this.feedback = `${data} is typing a message`;
  }

  sendMessage2() {
    console.log('sendMessage2');
    this.webSocketService.emit('send', {
      room: this.room,
      message: 'teste'
    });
  }

  connect() {
    console.log('connect');
    this.webSocketService.emit('subscribe', this.room);
  }

  disconect() {
    console.log('disconect');
    this.webSocketService.emit('unsubscribe', this.room);
  }
}
