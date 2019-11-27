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

  public notify(action: string, payload?: object): void {
    this.server.emit('chat', {action, payload});
  }

}
