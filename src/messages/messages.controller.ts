import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Message } from './messages.entity';
import { MessagesService } from './messages.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller()
export class MessagesController {
  constructor(private service: MessagesService) {}

  @Post('messages')
  create(@Body() message: Message, @Req() request) {
    return this.service.createMessage(message, request.user.userId);
  }

  @Get('messages')
  showAllMessages() {
    return this.service.showAll();
  }

  @Get('messages/:id')
  getMessage(@Param('id') id: number) {
    return this.service.getMessageById(id);
  }

  @Delete('messages/:id')
  deleteMessage(@Param('id') id: number) {
    return this.service.delete(id);
  }

  @Get('online')
  usersOnline() {
    return this.service.getOnlineUsers();
  }
}
