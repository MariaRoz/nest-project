import { Injectable } from '@nestjs/common';
import { Message } from './messages.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { MessageDto } from './messages.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

   async createMessage(data: MessageDto, userId) {
    return this.messageRepository.insert({authorId: userId, message: data.message});
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
}
