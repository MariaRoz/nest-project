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

   async createMessage(data: MessagesDto) {
    const message = await this.messageRepository.create(data);
    await this.messageRepository.save(message);
    return message;
  }

  async showAll() {
    return await this.messageRepository.find();
  }

  async getMessageById(id: number) {
    return await this.messageRepository.findOne({where: { id }});
  }

  async delete(id: number) {
     return await this.messageRepository.delete(id);
  }
}
