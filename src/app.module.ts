import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from './messages/messages.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(), MessagesModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
