import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection {

  @WebSocketServer() server: Server;

  handleConnection(socket) {
    console.log('New Connection has been added');
  }

  public notify(action: string, payload: object): void {
    console.log('tutututututu');
    this.server.emit('messages', {action, payload});
  }

  @SubscribeMessage('messages')
  handleEvent(client, @MessageBody() data: string): string {
    console.log(data, 'ffff');
    client.broadcast.emit('messages', data);
    console.log(data, 'nnn');
    return data;
  }
}
