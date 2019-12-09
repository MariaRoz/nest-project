import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { MessageEntity } from './messages.entity';
import { MessagesService } from './messages.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))

@Controller()
export class MessagesController {
  constructor(private service: MessagesService) {}

  @Post('messages')
  create(@Body() message: MessageEntity, @Req() request) {
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

  @Post('messages/offline')
  createOfflineMessages(@Body() messages: MessageEntity[],  @Req() request) {
    return this.service.createOfflineMessages(messages, request.user.userId);
  }
}
