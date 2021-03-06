import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './messages.entity';
import { EventsGateway } from './event.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  providers: [MessagesService, EventsGateway],
  controllers: [MessagesController],
  exports: [EventsGateway],
})
export class MessagesModule {}
