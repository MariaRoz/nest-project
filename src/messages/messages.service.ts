import { Injectable } from '@nestjs/common';
import { MessageEntity } from './messages.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { MessageDto } from './messages.dto';
import { EventsGateway } from './event.gateway';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    private eventGateway: EventsGateway,
  ) {}

   async createMessage(data: MessageDto, userId) {
    const insertMessage = await this.messageRepository.insert({authorId: userId, message: data.message});
    this.eventGateway.notify('[Chat] Chat Updated');
    return insertMessage;
  }

  async createOfflineMessages(data, userId) {
    data.map(async res => await this.messageRepository.insert({authorId: userId, message: res.message, createdAt: res.createdAt}));
    this.eventGateway.notify('[Chat] Chat Updated');
    return data;
  }

  async showAll(): Promise<MessageDto[]> {
    let result = await this.messageRepository.find({relations: ['author']});

    result = result.map(messages => {
      messages.author.sanitize(); return messages;
    });

    return result;
  }

  async getMessageById(id: number): Promise<MessageDto> {
    return this.messageRepository.findOne({where: { id }});
  }

  async delete(id: number): Promise<DeleteResult> {
     return this.messageRepository.delete(id);
  }
}
