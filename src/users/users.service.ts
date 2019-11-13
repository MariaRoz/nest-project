import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity)
              private readonly userRepository: Repository<UserEntity>) {}

  async findOne(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({where: { username }});
  }

  async createUser(data): Promise<User> {
    const user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return user;
  }
}
