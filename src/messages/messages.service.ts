import { Injectable } from '@nestjs/common';
import { Messages } from './messages.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessagesDto } from './messages.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages)
    private readonly messageRepository: Repository<Messages>,
  ) {}

   async createMessage(data: MessagesDto, userId) {
    return this.messageRepository.insert({authorId: userId, message: data.message});
  }

  async showAll() {
 let result = await this.messageRepository.find({relations: ['author']});

 result = result.map(messages => {
   messages.author.sanitize(); return messages;
 });

 return result;
  }

  async getMessageById(id: number) {
    return await this.messageRepository.findOne({where: { id }});
  }

  async delete(id: number) {
     return await this.messageRepository.delete(id);
  }
}
