import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: any) {
    const user = await this.usersService.findOne(data.username);
    if (user && await AuthService.passwordsAreEqual(user.password, data.password)) {
      return {
        username: user.username,
        access_token: this.jwtService.sign({ username: user.username, sub: user.id }),
      };
    }
    throw new UnauthorizedException();
  }

  async register(data: any) {
    let user = await this.usersService.findOne(data.username);
    if (user) {
      throw new HttpException({status: HttpStatus.FORBIDDEN, error: 'Username exist'}, 403);
    }
    user = await this.usersService.createUser(data);
    return {
      username: user.username,
      access_token: this.jwtService.sign({ username: user.username, sub: user.id }),
    };
  }

  private static async passwordsAreEqual(
    hashedPassword: string,
    plainPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
