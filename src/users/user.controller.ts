import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('online')
  usersOnline() {
    return this.usersService.getOnlineUsers();
  }
}
