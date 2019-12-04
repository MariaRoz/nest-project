import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { MoreThan, Repository } from 'typeorm';
import { Message } from '../messages/messages.entity';

export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity)
              private readonly userRepository: Repository<UserEntity>,
              @InjectRepository(Message)
              private readonly messageRepository: Repository<Message>) {}

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
