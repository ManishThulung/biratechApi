import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { HashService } from 'src/helper/hash.service';
import { AuthService } from 'src/auth/auth.service';
import { LocalStrategy } from 'src/auth/local.strategy';
import { JwtService } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [MailModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    UsersService,
    HashService,
    JwtService,
    AuthService,
    LocalStrategy,
    MailService,
  ],
  // exports: [UsersService, HashService],
})
export class UsersModule {}
