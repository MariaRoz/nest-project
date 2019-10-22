import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Messages } from './messages.entity';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private service: MessagesService) {}

  @Post()
  create(@Body() message: Messages) {
    return this.service.createMessage(message);
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
