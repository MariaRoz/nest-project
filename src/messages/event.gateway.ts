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
export class EventsGateway {

  @WebSocketServer() server: Server;

  public notify(type: string, payload?: object): void {
    this.server.emit('notification', {type, payload});
  }

}
