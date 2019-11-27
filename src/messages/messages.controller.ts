import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Message } from './messages.entity';
import { MessagesService } from './messages.service';
import { AuthGuard } from '@nestjs/passport';
import { EventsGateway } from './event.gateway';

@UseGuards(AuthGuard('jwt'))
@Controller('messages')
export class MessagesController {
  constructor(private service: MessagesService, private eventGateway: EventsGateway) {}

  @Post()
  create(@Body() message: Message, @Req() request) {
    this.eventGateway.notify('ChatUpdated');
    return this.service.createMessage(message, request.user.userId);
  }

  @Get()
  showAllMessages() {
    return this.service.showAll();
  }

  @Get(':id')
  getMessage(@Param('id') id: number) {
    return this.service.getMessageById(id);
  }

  @Delete(':id')
  deleteMessage(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
