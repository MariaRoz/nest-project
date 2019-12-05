import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { MessageEntity } from './messages.entity';
import { MessagesService } from './messages.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('messages')
export class MessagesController {
  constructor(private service: MessagesService) {}

  @Post()
  create(@Body() message: MessageEntity, @Req() request) {
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
