import { Injectable } from '@nestjs/common';
import { Message } from './messages.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { MessageDto } from './messages.dto';
import { EventsGateway } from './event.gateway';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private eventGateway: EventsGateway,
  ) {}

   async createMessage(data: MessageDto, userId) {
    const insertMessage = await this.messageRepository.insert({authorId: userId, message: data.message});
    this.eventGateway.notify('[Chat] Chat Updated');
    return insertMessage;
  }

  async showAll(): Promise<Message[]> {
    let result = await this.messageRepository.find({relations: ['author']});

    result = result.map(messages => {
      messages.author.sanitize(); return messages;
    });

    return result;
  }

  async getMessageById(id: number): Promise<Message> {
    return this.messageRepository.findOne({where: { id }});
  }

  async delete(id: number): Promise<DeleteResult> {
     return this.messageRepository.delete(id);
  }

  async getOnlineUsers(): Promise<string []> {
    const result = await this.messageRepository.find({relations: ['author']});

    return [...new Set(result.filter(messages => (new Date().getTime() - messages.createdAt.getTime()) / 60000 < 15)
      .map(data => data.author.username))];
  }
}
