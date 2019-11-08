import { Body, Controller, Post, Request, Response } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  async login(@Body() body) {
    return this.authService.login(body);
  }

  @Post('register')
  async register(@Body() body) {
    return this.authService.register(body);
  }

}
