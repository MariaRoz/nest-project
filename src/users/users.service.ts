import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { MoreThan, Repository } from 'typeorm';
import { MessageEntity } from '../messages/messages.entity';

export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity)
              private readonly userRepository: Repository<UserEntity>,
              @InjectRepository(MessageEntity)
              private readonly messageRepository: Repository<MessageEntity>) {}

  async findOne(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({where: { username }});
  }

  async createUser(data): Promise<User> {
    const user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return user;
  }

  async getOnlineUsers(): Promise<string[]> {
    const data = new Date();
    data.setMinutes(data.getMinutes() - 15);
    return await this.messageRepository.createQueryBuilder('message')
      .leftJoinAndSelect('message.author', 'author')
      .where({ createdAt: MoreThan(`${data.toISOString()}`) })
      .select(['author.username'])
      .distinct()
      .getRawMany();
  }

}
