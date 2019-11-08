import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {
  }

  @Post()
  create(@Body() user: UserEntity) {
    return this.service.createUser(user);
  }
}
